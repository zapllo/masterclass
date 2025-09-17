import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Content, { IContent, ITestimonial, ITrackingScript, IBonus } from '@/lib/models/Content'
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

const defaultBonuses: IBonus[] = [
  {
    id: '1',
    title: 'Team Performance Dashboard',
    description: 'Real-time analytics to track productivity and identify bottlenecks',
    value: '₹15,000',
    image: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-8.png.webp',
    icon: '📊'
  },
  {
    id: '2',
    title: 'Delegation Playbook Templates',
    description: 'Ready-to-use SOPs and task delegation frameworks',
    value: '₹12,000',
    image: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-2.webp',
    icon: '📋'
  },
  {
    id: '3',
    title: 'Accountability Systems Toolkit',
    description: 'Automated tracking and reporting systems for team oversight',
    value: '₹18,000',
    image: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-3.webp',
    icon: '🎯'
  },
  {
    id: '4',
    title: '1-Hour Private Consultation',
    description: 'Personal session with Shubhodeep to customize your automation strategy',
    value: '₹25,000',
    image: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-4.webp',
    icon: '💼'
  },
  {
    id: '5',
    title: 'Exclusive Leadership Community',
    description: 'Lifetime access to network with 500+ successful business owners',
    value: '₹8,000',
    image: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-8.png.webp',
    icon: '🤝'
  },
  {
    id: '6',
    title: 'Monthly Implementation Calls',
    description: '6 months of group coaching calls for ongoing support',
    value: '₹30,000',
    image: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-2.webp',
    icon: '📞'
  }
]

const defaultDynamicHeadings = [
  {
    id: '1',
    key: 'smb-owners',
    mainHeading: 'Stop Being the "Chief Follow-Up Officer"',
    subHeading: 'Turn Your Small Business Into an Autopilot Machine',
    description: 'Let AI handle follow-ups while you focus on growth and scaling your business smartly.',
    oldWay: 'Hire more managers, chase your team, and drown in follow-ups.',
    newWay: 'Plug in Zapllo, Your AI Co-Manager that saves time, cuts costs, reduces errors & scales your business smartly.',
    price: '₹197',
    originalPrice: '₹1999',
    enrollLink: 'https://pages.razorpay.com/smb-special'
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
  }
]

export async function GET() {
  try {
    await dbConnect()
    let content = await Content.findOne();

    if (!content) {
      content = await Content.create({
        testimonials: defaultTestimonials,
        bonuses: defaultBonuses,
        trackingScripts: defaultTrackingScripts,
        dynamicHeadings: defaultDynamicHeadings,
        eventDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        whatsappTemplate: {
          templateName: 'masterclass_registration',
          variable1: '{{SESSION_INFO}}',
          variable2: 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t',
          variable3: 'https://zapllo.com'
        },
        thankYouPage: {
          videoUrl: 'https://lp.launchatscale.com/wp-content/uploads/2025/06/C3926-YT.mp4',
          videoPoster: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Shubh-Jain-thum1-1-1.avif',
          whatsappGroupLink: 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t'
        }
      })
    }

    // Ensure all new fields exist with defaults
    if (!content.dynamicHeadings || content.dynamicHeadings.length === 0) {
      content.dynamicHeadings = defaultDynamicHeadings
      await content.save()
    }

    if (!content.bonuses || content.bonuses.length === 0) {
      content.bonuses = defaultBonuses
      await content.save()
    }

    if (!content.whatsappTemplate) {
      content.whatsappTemplate = {
        templateName: 'masterclass_registration',
        variable1: '{{SESSION_INFO}}',
        variable2: 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t',
        variable3: 'https://zapllo.com'
      }
      await content.save()
    }

    if (!content.thankYouPage) {
      content.thankYouPage = {
        videoUrl: 'https://lp.launchatscale.com/wp-content/uploads/2025/06/C3926-YT.mp4',
        videoPoster: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Shubh-Jain-thum1-1-1.avif',
        whatsappGroupLink: 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t'
      }
      await content.save()
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
