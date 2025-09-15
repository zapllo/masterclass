import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Content, { IContent, ITestimonial, ITrackingScript } from '@/lib/models/Content'
import { verifyToken, getTokenFromHeaders } from '@/lib/auth'

const defaultTestimonials: ITestimonial[] = [
  {
    id: '1',
    name: 'Swastik Nandakumar',
    quote: '"Made 65 lakhs without ads!"',
    thumbnail: 'https://lp.launchatscale.com/wp-content/uploads/2025/02/Swastik-Nand_1-1.png',
    videoUrl: 'https://millionsindays.com/wp-content/uploads/2024/11/24-May-2024-6638af60660aba4f10831578.mp4'
  },
  {
    id: '2',
    name: 'Karthik Naidu',
    quote: '"Generated 80 lakh in two days!"',
    thumbnail: 'https://lp.launchatscale.com/wp-content/uploads/2025/02/Karthik-stage-min-scaled-1.jpg',
    videoUrl: 'https://millionsindays.com/wp-content/uploads/2024/11/24-May-2024-66105afe22ca2788b2ef90c5.mp4'
  },
  {
    id: '3',
    name: 'Arzoo Shah',
    quote: '"Made so much revenue in 3 days, what usually takes 6 months!"',
    thumbnail: 'https://lp.launchatscale.com/wp-content/uploads/2025/02/Arzoo-Shah_1-1.png',
    videoUrl: 'https://millionsindays.com/wp-content/uploads/2024/11/24-May-2024-6610554a86f6ec7fd8be0b5d.mp4'
  }
]


const defaultTrackingScripts: ITrackingScript[] = [
  {
    id: '1',
    name: 'Meta Pixel',
    script: `<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1106571651572381');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1106571651572381&ev=PageView&noscript=1"
/></noscript>`,
    enabled: true
  },
  {
    id: '2',
    name: 'Google Analytics',
    script: `<script async src="https://www.googletagmanager.com/gtag/js?id=AW-670210434"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-670210434');
</script>`,
    enabled: true
  },
  {
    id: '3',
    name: 'Microsoft Clarity',
    script: `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBorder(t,y);
    })(window, document, "clarity", "script", "t2vg0a9heb");
</script>`,
    enabled: true
  }
]

export async function GET() {
  try {
    await dbConnect()
    let content = await Content.findOne()

    if (!content) {
      // Create default content if none exists
      content = await Content.create({
        testimonials: defaultTestimonials,
        trackingScripts: defaultTrackingScripts,
        eventDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      })
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error('Get content error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


export async function PUT(request: NextRequest) {
  try {
    await dbConnect()

    const token = getTokenFromHeaders(request)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const updateData: Partial<IContent> = await request.json()

    let content = await Content.findOne()
    if (!content) {
      content = await Content.create(updateData)
    } else {
      content = await Content.findOneAndUpdate({}, updateData, { new: true })
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error('Update content error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}