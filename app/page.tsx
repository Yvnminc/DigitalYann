import { ThemeProvider } from "@/components/theme-provider"
import VoiceInterface from "@/components/voice-interface"
import { WavyBackground } from "@/components/wavy-background"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="relative h-screen w-full overflow-hidden bg-black">
        <WavyBackground waveWidth={60} blur={15} waveOpacity={0.6} speed="fast" />
        <VoiceInterface />
      </main>
    </ThemeProvider>
  )
}
