import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Activity, Home, Users, Heart, ShieldCheck, Baby, MessageSquare, Stethoscope, BookOpen, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Stethoscope className="w-10 h-10 text-primary" />,
    title: 'Developmental Pediatrician Assessment',
    description:
      'Comprehensive child development evaluations by certified developmental pediatricians specializing in early childhood assessment and intervention.',
  },
  {
    icon: <Brain className="w-10 h-10 text-primary" />,
    title: 'Child Behavioral Therapy',
    description:
      'Specialized behavioral interventions for children with developmental delays, autism spectrum disorders, and behavioral challenges.',
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-primary" />,
    title: 'Speech Therapy Dubai',
    description:
      'Expert speech and language therapy services for children with communication delays, articulation issues, and language development needs.',
  },
  {
    icon: <Baby className="w-10 h-10 text-primary" />,
    title: 'Early Childhood Assessment',
    description:
      'Comprehensive developmental screenings for toddlers and preschoolers to identify potential delays and create early intervention plans.',
  },
  {
    icon: <Target className="w-10 h-10 text-primary" />,
    title: 'Special Needs Center',
    description:
      'Specialized support services for children with special needs, including individualized education plans and family support programs.',
  },
  {
    icon: <Award className="w-10 h-10 text-primary" />,
    title: 'Expert Pediatric Specialists',
    description:
      'Licensed and experienced pediatric specialists providing evidence-based assessments and interventions for optimal child development.',
  },
];

const SectionTitle = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
  >
    {children}
  </motion.h2>
);

const ServicesSection = () => (
  <section id="services" className="py-16 md:py-24 bg-background" dir="ltr">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle dir="ltr">Child Assessment Services</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm border border-primary/20">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-primary" dir="ltr">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground" dir="ltr">{service.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 p-8 bg-gradient-to-r from-primary/80 to-accent/80 rounded-lg text-center text-white shadow-lg"
      >
        <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-white" />
        <h3 className="text-2xl font-semibold mb-2" dir="ltr">Expert Child Development Support</h3>
        <p className="text-lg" dir="ltr">
          Unlock your child's potential with comprehensive assessments, behavioral therapy, and developmental support - evidence-based interventions delivered by Dubai's leading pediatric specialists.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
