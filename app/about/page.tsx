"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Shield, Heart } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

const timeline = [
  {
    year: "1974",
    title: "Founded in Windsor",
    description:
      "UCC Mortgage Co. opens its doors in Windsor, Ontario with a mission to provide homeowners access to fair, transparent mortgage financing.",
  },
  {
    year: "1985",
    title: "Commercial expansion",
    description:
      "Growing demand from local businesses leads to a dedicated commercial lending division, financing the construction and purchase of local properties.",
  },
  {
    year: "1994",
    title: "Private lending network",
    description:
      "Recognizing that not all clients fit the bank mold, UCC builds one of Windsor's first dedicated private mortgage lending networks.",
  },
  {
    year: "2008",
    title: "Licensed administrator",
    description:
      "UCC becomes Windsor's only licensed mortgage administrator, giving clients an added layer of regulatory protection on their investments.",
  },
  {
    year: "2012",
    title: "40+ lender network",
    description:
      "After decades of relationship-building, UCC's lender network exceeds 40 active lending partners — giving clients access to the widest possible range of products.",
  },
  {
    year: "2019",
    title: "Digital application launch",
    description:
      "UCC launches its first digital pre-application platform, enabling clients to start the mortgage process from anywhere, 24/7.",
  },
  {
    year: "2024",
    title: "50 years of service",
    description:
      "Celebrating five decades of helping Windsor families and businesses achieve their real estate goals. Over $1.2B in mortgages placed.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Transparency first",
    description:
      "We explain every rate, fee, and term in plain language. No surprises at the closing table.",
  },
  {
    icon: Users,
    title: "People over product",
    description:
      "We recommend what's right for your situation, not what earns the highest commission.",
  },
  {
    icon: Award,
    title: "Local expertise",
    description:
      "50+ years in Windsor means we understand local property values, lenders, and market dynamics better than anyone.",
  },
  {
    icon: Heart,
    title: "Long-term relationships",
    description:
      "Many of our clients have been with us for decades. We measure success in repeat clients, not one-time transactions.",
  },
];

const team = [
  {
    name: "Michael Caruso",
    title: "Principal Broker",
    since: "Since 1992",
    bio: "30+ years helping Windsor families navigate the mortgage market. Michael oversees all residential and private mortgage files.",
  },
  {
    name: "Sandra Vittoria",
    title: "Senior Commercial Broker",
    since: "Since 2003",
    bio: "Specialist in multi-unit residential and commercial property financing across Windsor-Essex.",
  },
  {
    name: "David Leblanc",
    title: "Mortgage Agent",
    since: "Since 2016",
    bio: "First-time buyer specialist with a focus on making the process approachable for new homeowners.",
  },
  {
    name: "Rachel Cho",
    title: "Mortgage Agent",
    since: "Since 2021",
    bio: "Expert in self-employed and non-traditional income mortgage solutions.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />

      <main>
        {/* Hero */}
        <section
          className="pt-24 pb-20 relative overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 30% 0%, rgba(46,95,146,0.14) 0%, transparent 60%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2e5f92]/20 border border-[#2e5f92]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                  <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full" />
                  Est. 1974 · Windsor, Ontario
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                50 years of getting
                <br />
                <span className="text-[#27aae1]">Windsor home.</span>
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                UCC Mortgage Co. has been Windsor's independent mortgage broker since 1974. We've helped thousands of families and businesses secure the financing they need — on terms that make sense.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-[#1a1f22] bg-[#0a0d0e]">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "1974", label: "Year founded" },
                { value: "$1.2B+", label: "Mortgages placed" },
                { value: "40+", label: "Lending partners" },
                { value: "10,000+", label: "Clients served" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-[#27aae1] mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">Our story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    UCC Mortgage Co. was founded in 1974 with a straightforward belief: homeowners deserve access to the same mortgage options as the banks' best clients — regardless of whether their situation fits neatly into a box.
                  </p>
                  <p>
                    For fifty years, we've operated as an independent brokerage in Windsor, Ontario. That independence has always been our greatest asset. We don't work for any bank. We work for you.
                  </p>
                  <p>
                    Over the decades, we built what is now one of the most comprehensive lender networks in Windsor-Essex — over 40 active relationships with banks, credit unions, trust companies, MICs, and private capital sources. When you work with UCC, the entire market is working for you.
                  </p>
                  <p>
                    In 2008, we became Windsor's only licensed mortgage administrator, offering an additional layer of security and oversight for the private mortgage investments we manage. It's a responsibility we take seriously.
                  </p>
                  <p>
                    Today, we continue to operate from our Windsor office with the same philosophy: honest advice, competitive rates, and a genuine commitment to the long-term financial wellbeing of our clients.
                  </p>
                </div>
              </motion.div>

              {/* Values */}
              <div className="space-y-4">
                {values.map((value, i) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="p-5 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/25 transition-all"
                      style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-[#27aae1]/10 flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#27aae1]" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-foreground mb-1.5">{value.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-[#0a0d0e] border-t border-[#1a1f22]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">50 years in Windsor</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A half-century of milestones, relationships, and service to the Windsor-Essex community.
              </p>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#006f7f] via-[#27aae1]/50 to-transparent hidden md:block" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`relative grid md:grid-cols-2 gap-6 md:gap-12 items-center ${
                      i % 2 === 0 ? "md:text-right" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                      <div
                        className="p-6 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/25 transition-all"
                        style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
                      >
                        <div className="text-[#27aae1] text-sm font-semibold mb-1">{item.year}</div>
                        <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0d0e] border-2 border-[#27aae1] items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#27aae1]" />
                    </div>

                    {/* Year label (other side) */}
                    <div className={`hidden md:flex items-center ${i % 2 === 0 ? "md:order-2 justify-start" : "md:order-1 justify-end"}`}>
                      <span className="text-4xl font-bold text-[#1a1f22]">{item.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-3">Meet the team</h2>
              <p className="text-muted-foreground max-w-xl">
                Licensed mortgage professionals with decades of collective experience in Windsor and Essex County.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/25 transition-all"
                  style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
                >
                  {/* Avatar placeholder */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2e5f92]/40 to-[#006f7f]/40 border border-[#27aae1]/20 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#27aae1]">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-0.5">{member.name}</h3>
                  <p className="text-xs text-[#27aae1] font-medium mb-0.5">{member.title}</p>
                  <p className="text-xs text-muted-foreground/60 mb-3">{member.since}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0a0d0e] border-t border-[#1a1f22]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Let's work together</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Whether it's your first mortgage or your twentieth, we bring the same care and expertise to every file.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/apply"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
                >
                  Start an application
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[#2a3033] text-foreground font-semibold rounded-full hover:border-[#27aae1]/40 hover:bg-[#27aae1]/5 transition-all"
                >
                  Contact us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
