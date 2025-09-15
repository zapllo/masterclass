import AboutSection from '@/components/AboutSection'
import AgendaSection from '@/components/AgendaSection'
import BonusSection from '@/components/BonusSection'
import ClientsSlider from '@/components/ClientSection'
import FAQSection from '@/components/FAQSection'
import FinalCTASection from '@/components/FinalCTASection'
import FooterSection from '@/components/FooterSection'
import HeroSection from '@/components/HeroSection'
import ReadyToBuySection from '@/components/ReadyToBuySection'
import ReverseFunnelSection from '@/components/ReverseFunnelSection'
import StickyBottomCTA from '@/components/StickyBottomCTA'
import TsunamiSection from '@/components/TsunamiSection'
import React from 'react'

export default function Home({ }) {
  return (
    <div className=''>
      <div className='w-full top-0 absolute z-[5555] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 overflow-hidden  flex justify-center'>
        <div>
          <div className='overflow-hidden mx-4 w-screen'>
            <HeroSection />
          </div>
          <div className='bg-[#F5F6F8] w-screen '>
            <ClientsSlider />
            <ReadyToBuySection />
            {/* <ReverseFunnelSection /> */}
            <AgendaSection />
            <div className='bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'>
              <TsunamiSection />
            </div>
            <div className='bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'>
            <BonusSection />
            </div>
            <FinalCTASection />
            <AboutSection />
            <FAQSection />
            <FooterSection />
            <StickyBottomCTA />
          </div>


        </div>
      </div>
    </div>
  )
}
