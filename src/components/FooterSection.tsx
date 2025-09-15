'use client'

export default function FooterSection() {
    return (
        <div className="w-full bg-white relative overflow-hidden mb-32 py-[10px] px-5 md:px-[20px] lg:px-[40px]  z-[5555]">
            <div className="max-w-[1140px] mx-auto">
                <div className="text-center">
                    <p className="text-[#272727] text-[15px] leading-[1.5] mb-4">
                        <b><b><strong>Copyright © [2025],[Launch at scale]. All rights reserved.</strong></b></b>
                    </p>
                    
                    <p className="text-[#272727] text-[15px] leading-[1.5] mb-0">
                        <b><b>
                            <span className="font-normal">This site is not a part of the Meta™ Inc. Additionally, this site is not endorsed by Meta™ in any way.</span>
                            <br />
                            <span className="font-normal">All content provided on this page is for informational and promotional purposes only. Results may vary and are not guaranteed. Please review our </span>
                            <a 
                                href="https://launchatscale.com/privacy-policy"
                                className="font-bold text-[#4169e1] hover:underline"
                            >
                                <b>Privacy Policy</b>
                            </a>
                            <span className="font-normal"> and </span>
                            <a 
                                href="https://launchatscale.com/termsandconditions"
                                className="font-bold text-[#4169e1] hover:underline"
                            >
                                <b>Terms of Service </b>
                            </a>
                            <span className="font-normal">before proceeding.</span>
                        </b></b>
                    </p>
                </div>
            </div>
        </div>
    )
}