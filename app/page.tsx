import VoiceInterface from "@/components/voice-interface"
import { WavyBackground } from "@/components/wavy-background"

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <WavyBackground waveWidth={60} blur={15} waveOpacity={0.6} speed="fast" />
      <VoiceInterface />
    </main>
  )
}
