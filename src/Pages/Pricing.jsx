import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
  }

  const plans = [
    {
      name: "Free",
      description: "Essential features for individuals and small projects",
      price: {
        monthly: "$0",
        yearly: "$0",
      },
      features: ["1 user", "5 projects", "Up to 1GB storage", "Basic analytics", "24-hour support response time"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "Perfect for professionals and growing teams",
      price: {
        monthly: "$29",
        yearly: "$290",
      },
      features: [
        "Up to 5 users",
        "20 projects",
        "Up to 10GB storage",
        "Advanced analytics",
        "12-hour support response time",
        "API access",
        "Custom integrations",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Advanced features for larger organizations",
      price: {
        monthly: "$99",
        yearly: "$990",
      },
      features: [
        "Unlimited users",
        "Unlimited projects",
        "Unlimited storage",
        "Custom analytics dashboard",
        "1-hour support response time",
        "Priority support",
        "Advanced security",
        "Custom branding",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="container py-16 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>
      </div>

      <div className="flex items-center justify-center mb-16">
        <span className={`mr-2 ${billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}`}>Monthly</span>
        <Switch checked={billingCycle === "yearly"} onCheckedChange={toggleBillingCycle} />
        <span className={`ml-2 ${billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}`}>
          Yearly <span className="text-sm text-emerald-600 font-medium">Save 20%</span>
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingItem plan={plan} billingCycle = {billingCycle}/>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          Have questions?{" "}
          <a href="#" className="text-primary hover:underline">
            Contact our sales team
          </a>
        </p>
      </div>
    </div>
  )
}

const PricingItem = ({plan , billingCycle }) =>{

  return  <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
  {plan.popular && (
    <div className="absolute -top-4 left-0 right-0 flex justify-center">
      <span className="bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
        Most Popular
      </span>
    </div>
  )}
  <CardHeader>
    <CardTitle>{plan.name}</CardTitle>
    <CardDescription>{plan.description}</CardDescription>
  </CardHeader>
  <CardContent className="flex-grow">
    <div className="mb-6">
      <span className="text-4xl font-bold">{plan.price[billingCycle]}</span>
      <span className="text-muted-foreground ml-2">{billingCycle === "monthly" ? "/month" : "/year"}</span>
    </div>
    <ul className="space-y-3">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start">
          <Check className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </CardContent>
  <CardFooter>
    <Button
      className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
      variant={plan.popular ? "default" : "outline"}
    >
      {plan.cta}
    </Button>
  </CardFooter>
</Card>
}