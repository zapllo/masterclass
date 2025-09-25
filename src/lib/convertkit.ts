// lib/convertkit.ts
export type CKOptions = {
  formId?: string | number | null
  tagId?: string | number | null
  sequenceId?: string | number | null
  fields?: Record<string, string | number | null | undefined>
  referrer?: string | null
}

const KIT_BASE = 'https://api.kit.com/v4'
const API_KEY = process.env.KIT_API_KEY

if (!API_KEY) {
  console.warn('⚠️ [ConvertKit] KIT_API_KEY not set. ConvertKit calls will fail until provided.')
}

async function ckFetch(path: string, init: RequestInit & { retry?: number } = {}) {
  const { retry = 1, ...rest } = init
  const res = await fetch(`${KIT_BASE}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': API_KEY || '',
      ...(rest.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    if (retry > 0 && (res.status >= 500 || res.status === 429)) {
      await new Promise(r => setTimeout(r, 400))
      return ckFetch(path, { ...init, retry: retry - 1 })
    }
    throw new Error(`Kit ${path} ${res.status} ${res.statusText} :: ${text}`)
  }
  if (res.status === 204) return null
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

/** Upsert subscriber; returns subscriber id + normalized data */
export async function ckUpsertSubscriber(params: {
  email: string
  firstName?: string | null
  fields?: CKOptions['fields']
}) {
  const payload: any = { email_address: params.email }
  if (params.firstName) payload.first_name = params.firstName
  if (params.fields) payload.fields = params.fields

  const data = await ckFetch('/subscribers', {
    method: 'POST',
    body: JSON.stringify(payload),
    retry: 2,
  })
  const subscriber = (data as any)?.subscriber
  return { id: subscriber?.id as number | undefined, subscriber }
}

/** Optional: add existing subscriber (by email) to a Form */
export async function ckAddToForm(formId: string | number, email: string, referrer?: string | null) {
  const body = { email_address: email, ...(referrer ? { referrer } : {}) }
  await ckFetch(`/forms/${formId}/subscribers`, {
    method: 'POST',
    body: JSON.stringify(body),
    retry: 2,
  })
}

/** Optional: add subscriber id to a Tag */
export async function ckTagSubscriber(tagId: string | number, subscriberId: number) {
  await ckFetch(`/tags/${tagId}/subscribers/${subscriberId}`, {
    method: 'POST',
    body: JSON.stringify({}),
    retry: 2,
  })
}

/** Optional: add subscriber to a Sequence by email address */
export async function ckAddToSequence(sequenceId: string | number, email: string) {
  await ckFetch(`/sequences/${sequenceId}/subscribers`, {
    method: 'POST',
    body: JSON.stringify({ email_address: email }),
    retry: 2,
  })
}

/** NEW: tag a subscriber with multiple tag IDs (ignores falsy/duplicates) */
export async function ckTagSubscriberMany(tagIds: Array<string | number | null | undefined>, subscriberId?: number) {
  if (!subscriberId) return
  const ids = Array.from(new Set(tagIds.filter(Boolean) as Array<string | number>))
  for (const tagId of ids) {
    try {
      await ckTagSubscriber(tagId, subscriberId)
      console.log('✅ CK tag applied:', tagId)
    } catch (e: any) {
      console.log(`⚠️ CK tag failed for tagId=${tagId}:`, e?.message)
    }
  }
}
