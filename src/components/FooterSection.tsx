'use client'

import { Zap, Shield, FileText, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function FooterSection() {
    return (
        <footer className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden mb-32 py-16 px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">


                {/* Copyright and Legal */}
                <div className="text-center space-y-4">
                    <Link href='https://zapllo.com'>
                        <div className='flex justify-center '>
                            <img src='/zapllo.png' className='h-10' />
                        </div>
                    </Link>
                    <div className="0 rounded-2xl p-6 ">
                        <p className="text-gray-800 font-bold text-sm mb-4">
                            Copyright © 2025, Zapllo Technologies Private Limited. All rights reserved.
                        </p>

                        <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                            <p>
                                <span className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-2">
                                    <span className="text-lg">⚠️</span>
                                    Important Disclaimer
                                </span>
                            </p>

                            <p>
                                This site is not affiliated with Meta™ Inc. or any other social media platform.
                                All content is for informational purposes only. Results may vary based on implementation and business conditions.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6 pt-4">
                                <LegalLink
                                    href="https://www.zapllo.com/privacypolicy"
                                    icon={<Shield className="h-4 w-4" />}
                                    text="Privacy Policy"
                                />
                                <LegalLink
                                    href="https://www.zapllo.com/terms"
                                    icon={<FileText className="h-4 w-4" />}
                                    text="Terms of Service"
                                />
                                <LegalLink
                                    href="https://www.zapllo.com/refundpolicy"
                                    icon={<span className="text-sm">💰</span>}
                                    text="Refund Policy"
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {/* Custom CSS for enhanced glassmorphism */}
            <style jsx global>{`
                .backdrop-blur-2xl {
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                }
            `}</style>
        </footer>
    )
}

/* Custom Components */
function FooterLink({ href, text }: { href: string; text: string }) {
    return (
        <a
            href={href}
            className="block text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-200 hover:translate-x-1"
        >
            {text}
        </a>
    )
}

function TrustBadge({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="backdrop-blur-lg bg-white/40 border border-white/60 rounded-xl p-3 text-center hover:bg-white/50 transition-all duration-300 shadow-sm">
            <div className="flex items-center justify-center mb-2 text-blue-600">
                {icon}
            </div>
            <h5 className="font-bold text-gray-800 text-xs mb-1">{title}</h5>
            <p className="text-gray-600 text-xs">{description}</p>
        </div>
    )
}

function LegalLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 hover:underline"
        >
            {icon}
            {text}
        </a>
    )
}
