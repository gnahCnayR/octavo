import { Header } from "@/components/header"
import { Brain, Users, Zap, Target, Shield, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Collective Intelligence",
    description: "Harness the power of shared knowledge from thousands of experiences and insights."
  },
  {
    icon: Users,
    title: "Agent Memory",
    description: "Advanced Letta agents process and synthesize information from diverse sources."
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Get instant results powered by Groq's lightning-fast inference engine."
  },
  {
    icon: Target,
    title: "Precise Insights",
    description: "Find exactly what worked, backed by real data and confidence scores."
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Every insight comes with source attribution and confidence metrics."
  },
  {
    icon: Sparkles,
    title: "Continuous Learning",
    description: "Our system grows smarter with every query and shared experience."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold text-foreground mb-4 tracking-tight">
            About <span className="text-orange-500">Octavo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collective memory search engine that helps you discover what actually worked, 
            powered by cutting-edge AI agents and real human experiences.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-card border border-border rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            In a world overflowing with information, finding actionable insights is harder than ever. 
            Octavo transforms scattered knowledge into collective wisdom, helping you learn from the 
            experiences of thousands who've walked similar paths. We believe that the best answers 
            come not from algorithms alone, but from the synthesis of real human experiences.
          </p>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-background font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ask Anything</h3>
              <p className="text-muted-foreground text-sm">
                Search for insights on any topic - from career advice to technical challenges.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-background font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI Processing</h3>
              <p className="text-muted-foreground text-sm">
                Letta agents analyze thousands of memories to find relevant patterns and insights.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-background font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get Answers</h3>
              <p className="text-muted-foreground text-sm">
                Receive synthesized insights with confidence scores and source attribution.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Why Octavo?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Built With</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-semibold text-foreground mb-2 text-orange-500">Letta Agents</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced memory-enabled AI agents for intelligent information processing
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2 text-orange-500">Orkes Orchestration</h3>
                <p className="text-muted-foreground text-sm">
                  Workflow orchestration for complex multi-agent operations
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2 text-orange-500">Groq Inference</h3>
                <p className="text-muted-foreground text-sm">
                  Lightning-fast AI inference for real-time search results
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mt-8 text-sm">
            Made with ❤️ for the hackathon community
          </p>
        </div>
      </main>
    </div>
  )
} 