'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Brand = {
    name: string
    logo: string
    id: number
}

// Generate brands array with your brand images
const brands: Brand[] = Array.from({ length: 20 }, (_, index) => ({
    name: `Brand ${index + 1}`,
    logo: `/brands/${index + 1}.png`,
    id: index + 1
}))

function BrandCard({ brand, isMobile }: { brand: Brand; isMobile: boolean }) {
    return (
        <article className={`${isMobile
            ? 'min-w-[200px]  max-w-[200px] mx-2'
            : 'mx-3 min-w-[180px] max-w-[180px]'
            } flex-shrink-0 rounded-2xl mb-2 ition-all duration-300 transform hover:scale-105`}>
            <div className="mx-auto aspect-square w-full max-w-36 overflow- rounded-xl backdrop-blur-sm bg-white/50 p-4 shadow-lg">
                <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={200}
                    height={200}
                    className="h-32 w-full object-cover"
                    onError={(e) => {
                        // Fallback if image doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/120x120/6366f1/white?text=${brand.id}`;
                    }}
                />
            </div>
        </article>
    )
}

export default function BrandsSlider() {
    const [isHovered, setIsHovered] = useState(false)
    const [isReversed, setIsReversed] = useState(false)
    const [currentTranslate, setCurrentTranslate] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const mobileIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const touchStartRef = useRef<number>(0)
    const touchEndRef = useRef<number>(0)

    // Check if mobile on component mount and window resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Mobile auto-scroll logic
    useEffect(() => {
        if (isMobile && !isAutoScrollPaused) {
            if (mobileIntervalRef.current) {
                clearInterval(mobileIntervalRef.current)
            }

            mobileIntervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % Math.ceil(brands.length / 2))
            }, 2000)

            return () => {
                if (mobileIntervalRef.current) {
                    clearInterval(mobileIntervalRef.current)
                }
            }
        }
    }, [isMobile, isAutoScrollPaused])

    // Desktop smooth scroll logic
    const getCardWidth = () => {
        return 210 // Brand cards are smaller
    }

    const getAnimationSpeed = () => {
        return isHovered ? 0.3 : 1.2 // Slightly faster than client cards
    }

    const CARD_WIDTH = getCardWidth()
    const TOTAL_ORIGINAL_WIDTH = brands.length * CARD_WIDTH

    // Create multiple copies for infinite scroll (desktop only)
    const extendedBrands = [...brands, ...brands, ...brands]

    const startDesktopAnimation = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            const speed = getAnimationSpeed()
            setCurrentTranslate(prev => {
                const direction = isReversed ? speed : -speed
                let newTranslate = prev + direction

                // Reset position when we've scrolled through all original items
                if (newTranslate <= -TOTAL_ORIGINAL_WIDTH * 2) {
                    newTranslate = -TOTAL_ORIGINAL_WIDTH
                } else if (newTranslate >= 0) {
                    newTranslate = -TOTAL_ORIGINAL_WIDTH
                }

                return newTranslate
            })
        }, 16) // ~60fps
    }

    const stopDesktopAnimation = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    // Desktop animation setup
    useEffect(() => {
        if (!isMobile) {
            setCurrentTranslate(-TOTAL_ORIGINAL_WIDTH)
            startDesktopAnimation()

            return () => stopDesktopAnimation()
        }
    }, [isHovered, isReversed, isMobile])

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsHovered(true)
        }
    }

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsHovered(false)
        }
    }

    // Mobile navigation functions
    const goToPrevSlide = () => {
        if (isMobile) {
            setIsAutoScrollPaused(true)
            setCurrentIndex(prev => prev === 0 ? Math.ceil(brands.length / 2) - 1 : prev - 1)

            setTimeout(() => {
                setIsAutoScrollPaused(false)
            }, 5000)
        } else {
            setIsReversed(true)
            handleManualScroll('left')
        }
    }

    const goToNextSlide = () => {
        if (isMobile) {
            setIsAutoScrollPaused(true)
            setCurrentIndex(prev => (prev + 1) % Math.ceil(brands.length / 2))

            setTimeout(() => {
                setIsAutoScrollPaused(false)
            }, 5000)
        } else {
            setIsReversed(false)
            handleManualScroll('right')
        }
    }

    const handleManualScroll = (direction: 'left' | 'right') => {
        stopDesktopAnimation()
        setCurrentTranslate(prev => {
            const scrollAmount = direction === 'left' ? CARD_WIDTH * 2 : -CARD_WIDTH * 2
            let newTranslate = prev + scrollAmount

            if (newTranslate <= -TOTAL_ORIGINAL_WIDTH * 2) {
                newTranslate = -TOTAL_ORIGINAL_WIDTH
            } else if (newTranslate >= 0) {
                newTranslate = -TOTAL_ORIGINAL_WIDTH
            }

            return newTranslate
        })

        setTimeout(() => {
            startDesktopAnimation()
        }, 1000)
    }

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!isMobile) return
        touchStartRef.current = e.targetTouches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isMobile) return
        touchEndRef.current = e.targetTouches[0].clientX
    }

    const handleTouchEnd = () => {
        if (!isMobile) return

        const touchDiff = touchStartRef.current - touchEndRef.current
        const minSwipeDistance = 50

        if (Math.abs(touchDiff) > minSwipeDistance) {
            if (touchDiff > 0) {
                goToNextSlide()
            } else {
                goToPrevSlide()
            }
        }
    }

    return (
        <section className="w-full py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            <div className="relative z-10 mx-auto md:max-w-[1240px] px-4">
                <div className="text-center mb-12">
                    <h2 className="mb-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                        Trusted By Leading Brands
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-xl text-gray-600 font-medium">
                        Join thousands of businesses growing with our platforms
                    </p>
                </div>

                <div className="relative group">
                    {/* Left Arrow */}
                    <button
                        onClick={goToPrevSlide}
                        aria-label="Scroll left"
                        className={`absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full backdrop-blur-xl bg-white/40 border-2 border-white/50 p-3 shadow-xl hover:bg-white/50 hover:border-white/60 transition-all duration-300 ${isMobile
                            ? 'opacity-80 hover:opacity-100'
                            : 'opacity-0 md:group-hover:opacity-100'
                            }`}
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={goToNextSlide}
                        aria-label="Scroll right"
                        className={`absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full backdrop-blur-xl bg-white/40 border-2 border-white/50 p-3 shadow-xl hover:bg-white/50 hover:border-white/60 transition-all duration-300 ${isMobile
                            ? 'opacity-80 hover:opacity-100'
                            : 'opacity-0 md:group-hover:opacity-100'
                            }`}
                    >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>

                    <div className="overflow-hidden">
                        {isMobile ? (
                            // Mobile: Show 2 cards at a time
                            <div
                                className="relative"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{
                                        transform: `translateX(-${currentIndex * 100}%)`
                                    }}
                                >
                                    {Array.from({ length: Math.ceil(brands.length / 2) }).map((_, slideIndex) => (
                                        <div key={slideIndex} className="w-full flex-shrink-0 flex justify-center gap-4 px-4">
                                            {brands.slice(slideIndex *1, slideIndex * 1 + 1).map((brand) => (
                                                <BrandCard key={brand.id} brand={brand} isMobile={true} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Desktop: Continuous smooth scroll
                            <div
                                ref={containerRef}
                                className="flex transition-none"
                                style={{
                                    transform: `translateX(${currentTranslate}px)`,
                                    width: `${extendedBrands.length * CARD_WIDTH}px`
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {extendedBrands.map((brand, index) => (
                                    <BrandCard key={`${brand.id}-${index}`} brand={brand} isMobile={false} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile pagination dots */}
                {isMobile && (
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: Math.ceil(brands.length / 2) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setIsAutoScrollPaused(true)
                                    setCurrentIndex(index)
                                    setTimeout(() => {
                                        setIsAutoScrollPaused(false)
                                    }, 5000)
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg'
                                    : 'bg-white/50 backdrop-blur-sm border border-white/60'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
