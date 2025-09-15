'use client'

import Image from 'next/image'
import { Calendar, Play } from 'lucide-react'
import EnrollButton from './enroll'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

// const testimonials = [
//     {
//         id: '1',
//         name: 'Swastik Nandakumar',
//         quote: '"Made 65 lakhs without ads!"',
//         thumbnail: 'https://lp.launchatscale.com/wp-content/uploads/2025/02/Swastik-Nand_1-1.png',
//         videoUrl: 'https://millionsindays.com/wp-content/uploads/2024/11/24-May-2024-6638af60660aba4f10831578.mp4'
//     },
//     {
//         id: '2',
//         name: 'Karthik Naidu',
//         quote: '"Generated 80 lakh in two days!"',
//         thumbnail: 'https://lp.launchatscale.com/wp-content/uploads/2025/02/Karthik-stage-min-scaled-1.jpg',
//         videoUrl: 'https://millionsindays.com/wp-content/uploads/2024/11/24-May-2024-66105afe22ca2788b2ef90c5.mp4'
//     },
//     {
//         id: '3',
//         name: 'Arzoo Shah',
//         quote: '"Made so much revenue in 3 days, what usually takes 6 months!"',
//         thumbnail: 'https://lp.launchatscale.com/wp-content/uploads/2025/02/Arzoo-Shah_1-1.png',
//         videoUrl: 'https://millionsindays.com/wp-content/uploads/2024/11/24-May-2024-6610554a86f6ec7fd8be0b5d.mp4'
//     }
// ]

function VideoThumbnail({ testimonial, onClick }: { testimonial: Testimonial, onClick: () => void }) {
    return (
        <div className="relative cursor-pointer p-4 bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl group" onClick={onClick}>
            <div className="relative overflow-hidden rounded-xl bg-white shadow-">
                <Image
                    src={testimonial.thumbnail}
                    alt={testimonial.name}
                    width={600}
                    height={400}
                    className="w-full h-auto aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-transparent /20 group-hover:bg-black/30 transition-all duration-300">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 text-[#] bg-transparent ml-1" fill="currentColor" />
                    </div>
                </div>
            </div>

            {/* Quote */}
            <div className="mt-4 text-center">
                <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold text-[#13316b]">
                    {testimonial.quote}
                </h3>
            </div>
        </div>
    )
}
// Animated Arrow Component
const AnimatedArrow = ({ className = "" }: { className?: string }) => (
    <div className={`inline-block ${className}`}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            width="60"
            height="60"
            preserveAspectRatio="xMidYMid meet"
            className="w-12 h-12 sm:w-16 sm:h-16"
        >
            <defs>
                <clipPath id="__lottie_element_38">
                    <rect width="500" height="500" x="0" y="0"></rect>
                </clipPath>
            </defs>
            <g clipPath="url(#__lottie_element_38)">
                <g transform="matrix(0.9999986290931702,0,0,0.9999986290931702,0.000244140625,0.000579833984375)" opacity="1">
                    <g opacity="1" transform="matrix(1,0,0,1,165.5489959716797,408.22698974609375)">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(255,3,3)"
                            strokeOpacity="1"
                            strokeWidth="13"
                            d="M-22.608999252319336,-10.553000450134277 C-22.608999252319336,-10.553000450134277 10.477999687194824,25.02899932861328 10.477999687194824,25.02899932861328 C14.522000312805176,8.343000411987305 18.565000534057617,-8.343000411987305 22.608999252319336,-25.02899932861328"
                            style={{
                                animation: 'arrowHeadAppear 3s ease-in-out infinite'
                            }}
                        />
                    </g>
                </g>
                <g transform="matrix(1,0,0,1,0,0)" opacity="1">
                    <g opacity="1" transform="matrix(1,0,0,1,249.40199279785156,242.52999877929688)">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(255,3,3)"
                            strokeOpacity="1"
                            strokeWidth="13"
                            d="M160.60000610351562,-173.0290069580078 C-76.98200225830078,-178.9709930419922 -158.76100158691406,-174.7209930419922 -159.39999389648438,-165.91799926757812 C-160.60000610351562,-149.406005859375 123.46099853515625,-113.99199676513672 121.48899841308594,-87.69499969482422 C120.177001953125,-70.2040023803711 -5.004000186920166,-92.18800354003906 -63.400001525878906,-23.695999145507812 C-107.53600311279297,28.070999145507812 -96.47000122070312,111.5250015258789 -77.62300109863281,178.97000122070312"
                            style={{
                                animation: 'drawArrowPath 3s ease-in-out infinite'
                            }}
                        />
                    </g>
                </g>
            </g>
        </svg>

        <style jsx>{`
            @keyframes drawArrowPath {
                0% {
                    stroke-dasharray: 0 1000;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 1000 1000;
                    stroke-dashoffset: 0;
                }
                100% {
                    stroke-dasharray: 0 1000;
                    stroke-dashoffset: -1000;
                }
            }
            
            @keyframes arrowHeadAppear {
                0% {
                    opacity: 0;
                }
                70% {
                    opacity: 0;
                }
                75% {
                    opacity: 1;
                }
                100% {
                    opacity: 1;
                }
            }
        `}</style>
    </div>
)

// function MobileDownloadIcon() {
//     return (
//         <div className="flex lg:hidden justify-center my-8">
//             <div className="w-20 h-20 relative">
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 1080 1080"
//                     width="80"
//                     height="80"
//                     preserveAspectRatio="xMidYMid meet"
//                     className="w-full h-full"
//                 >
//                     <defs>
//                         <clipPath id="__lottie_element_80">
//                             <rect width="1080" height="1080" x="0" y="0"></rect>
//                         </clipPath>
//                         <clipPath id="__lottie_element_82">
//                             <path d="M0,0 L1080,0 L1080,1080 L0,1080z"></path>
//                         </clipPath>
//                     </defs>
//                     <g clipPath="url(#__lottie_element_80)">
//                         <g clipPath="url(#__lottie_element_82)" transform="matrix(0,1,-1,0,1080,0)" opacity="1">
//                             <g className="animate-bounce-slow" transform="matrix(1,0,0,1,546.377685546875,540)" opacity="1">
//                                 <g opacity="1" transform="matrix(1,0,0,1,0,0)">
//                                     <path
//                                         fill="rgb(7,9,82)"
//                                         fillOpacity="1"
//                                         d="M-266,-182 C-266,-182 -40,1 -40,1 C-40,1 -272,178 -272,178 C-272,178 -155,180 -155,180 C-155,180 68,0 68,0 C68,0 -160.5,-181 -160.5,-181 C-160.5,-181 -266,-182 -266,-182z"
//                                         className="animate-pulse"
//                                         style={{ animationDelay: '0s' }}
//                                     />
//                                 </g>
//                             </g>
//                             <g className="animate-bounce-slow" transform="matrix(1,0,0,1,738.3756713867188,540)" opacity="1">
//                                 <g opacity="1" transform="matrix(1,0,0,1,0,0)">
//                                     <path
//                                         fill="rgb(44,46,92)"
//                                         fillOpacity="1"
//                                         d="M-266,-182 C-266,-182 -40,1 -40,1 C-40,1 -272,178 -272,178 C-272,178 -155,180 -155,180 C-155,180 68,0 68,0 C68,0 -160.5,-181 -160.5,-181 C-160.5,-181 -266,-182 -266,-182z"
//                                         className="animate-pulse"
//                                         style={{ animationDelay: '0.3s' }}
//                                     />
//                                 </g>
//                             </g>
//                             <g className="animate-bounce-slow" transform="matrix(1,0,0,1,912.377685546875,540)" opacity="1">
//                                 <g opacity="1" transform="matrix(1,0,0,1,0,0)">
//                                     <path
//                                         fill="rgb(255,0,23)"
//                                         fillOpacity="1"
//                                         d="M-266,-182 C-266,-182 -40,1 -40,1 C-40,1 -272,178 -272,178 C-272,178 -155,180 -155,180 C-155,180 68,0 68,0 C68,0 -160.5,-181 -160.5,-181 C-160.5,-181 -266,-182 -266,-182z"
//                                         className="animate-pulse"
//                                         style={{ animationDelay: '0.6s' }}
//                                     />
//                                 </g>
//                             </g>
//                         </g>
//                     </g>
//                 </svg>

//                 <style jsx>{`
//                     @keyframes bounce-slow {
//                         0%, 100% {
//                             transform: translateY(0);
//                             animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
//                         }
//                         50% {
//                             transform: translateY(-10px);
//                             animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
//                         }
//                     }

//                     .animate-bounce-slow {
//                         animation: bounce-slow 2s infinite;
//                     }
//                 `}</style>
//             </div>
//         </div>
//     )
// }
interface Testimonial {
    id: string
    name: string
    quote: string
    thumbnail: string
    videoUrl: string
}

export default function ReverseFunnelSection() {

    const [selectedVideo, setSelectedVideo] = useState<typeof testimonials[0] | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/content')
                if (response.ok) {
                    const data = await response.json()
                    setTestimonials(data.testimonials || [])
                }
            } catch (error) {
                console.error('Error fetching content:', error)
                // Fallback to default testimonials if API fails
                setTestimonials([
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
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchContent()
    }, [])

    const handleVideoClick = (testimonial: typeof testimonials[0]) => {
        setSelectedVideo(testimonial)
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setIsDialogOpen(false)
        setSelectedVideo(null)
    }
    return (
        <>
            <section className="w-full bg-[#F8FAFF] py-2">
                <div className="mx-auto max-w-[1200px] px-4">
                    {/* Main Headline */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] leading-[1.4] lg:text-[36px] font-bold text-[#13316b] leading-[1.2] mb-6">
                            After{' '}
                            <span className="inline-block bg-[#FFFECD] text-[#13316b] px-2 py-1 rounded">
                                <span className="text- text-[#13316b]">130+ Crores In Sales</span>
                            </span>{' '}
                            The Only System{' '}
                            <span className="underline">You&apos;ll <br className='hidden md:block' />Ever Need</span>{' '}
                            To Hit 1 CR Rapidly In 2025!
                        </h2>

                        {/* Decorative Line */}
                        <div className="flex justify-center mb-8 sm:mb-12">
                            <Image
                                src="https://lp.launchatscale.com/wp-content/uploads/2024/05/line.svg"
                                alt=""
                                width={200}
                                height={16}
                                className="w-full max-w-[200px] h-auto"
                            />
                        </div>
                    </div>

                    {/* Reverse Funnel System Image */}
                    <div className="relative mb-8 sm:mb-12">
                        <div className="relative transform  flex justify-center  sm:scale-110">
                            <Image
                                src="https://lp.launchatscale.com/wp-content/uploads/2025/02/Reverse-Funnel-System1-1-1024x584.webp"
                                alt="Reverse Funnel System"
                                width={1024}
                                height={584}
                                className="w-[900px] h-full rounded-xl shad"
                            />
                        </div>

                    </div>

                    {/* Mobile Download Animation */}
                    {/* <MobileDownloadIcon /> */}
                    <div className='md:grid grid-cols-3 hidden '>
                        <div className='relative'>
                            <AnimatedArrow className='scale-125 ml-36 mt-6 absolute' />
                        </div>
                        <div className='relative'>
                            <AnimatedArrow className='scale-125 ml-36 mt-6 absolute rotate-[360deg]' />
                        </div>
                        <div className='relative'>
                            <AnimatedArrow className='scale-125  ml-36 mt-6 absolute' />
                        </div>
                    </div>
                    <div className='flex md:hidden -mt-8 justify-center'>
                        <div className='grid grid-cols-3'>
                            <div>
                                <img src='/arrow.gif' className='h-12' />
                            </div>
                            <div>
                                <img src='/arrow.gif' className='h-12' />
                            </div>
                            <div>
                                <img src='/arrow.gif' className='h-12' />
                            </div>
                        </div>
                    </div>
                    {/* Testimonial Videos */}
                    <div className="grid grid-cols-1 md:mt-44 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                        {testimonials.map((testimonial) => (
                            <VideoThumbnail
                                key={testimonial.id}
                                testimonial={testimonial}
                                onClick={() => handleVideoClick(testimonial)}
                            />
                        ))}
                    </div>

                    {/* ... rest of the existing content remains the same ... */}
                </div>
                {/* CTA Section */}
                <div className='w-full flex justify-center md:-m -'>
                    <div className="text-center   space-y-4">

                        {/* CTA Section */}
                        <div className="text-center mt-4">
                            <div className="relative inline-block">
                                <EnrollButton

                                    price="₹99"
                                    originalPrice="₹999"
                                    buttonText="ENROLL NOW"
                                    className="inline-flex rounded-2xl -center justify-center "
                                />


                            </div>



                        </div>

                        {/* Progress bar */}
                        <div className="mt-6">
                            <div className="mx-auto grid gap-[2px] sm:gap-[3px] max-w-[300px] sm:max-w-none"
                                style={{ gridTemplateColumns: 'repeat(22,minmax(8px,18px))', width: 'fit-content' }}>
                                {Array.from({ length: 22 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={
                                            'h-[18px] sm:h-[24px] md:h-[28px] relative ' +
                                            (i < 20 ? 'bg-[#A8A8A8]' : 'bg-[#CF342A] animate-pulse')
                                        }
                                    >
                                        {i >= 20 && (
                                            <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-[14px] font-bold">
                                                ✔
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 flex items-center justify-center gap-2 text-[13px] font-bold text-[#454545]">
                                <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                                <span>Seats Of This Event As Of {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }).replace(/(\d+)/, '$1th')} Is Low</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Video Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent
                    className="max-w-[95vw] sm:max-w-[1000px] lg:max-w-[1200px] h-fit max-h-[900px]  p-0 overflow-hidden m-auto border-0 shadow-2xl bg-gradient-to-b from-white to-gray-50 rounded-2xl"
                    showCloseButton={false}
                >
                    <DialogHeader className="sr-only">
                        <DialogTitle>{selectedVideo?.name || 'Video'}</DialogTitle>
                    </DialogHeader>

                    {selectedVideo && (
                        <div className="relative w-full">
                            {/* Custom Close Button */}
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            >
                                <svg
                                    className="w-5 h-5 text-white group-hover:text-red-400 transition-colors duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Video Container with Premium Styling */}
                            <div className="relative w-full aspect-video h-fit bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-t-2xl overflow-hidden shadow-inner">
                                <video
                                    key={selectedVideo.id}
                                    src={selectedVideo.videoUrl}
                                    controls
                                    autoPlay
                                    preload="metadata"
                                    className="w-full md:max-h-[800px] h-fit object-contain rounded-t-2xl"
                                    poster={selectedVideo.thumbnail}
                                    onError={(e) => {
                                        console.error('Video failed to load:', e);
                                    }}
                                    onLoadStart={() => {
                                        console.log('Video loading started');
                                    }}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}