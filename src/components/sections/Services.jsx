import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Activity, Home, Users, Heart, ShieldCheck, Baby, MessageSquare, Stethoscope, BookOpen, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Stethoscope className="w-10 h-10 text-primary" />,
    title: 'Comprehensive Child Assessment',
    description:
      'Thorough developmental evaluations by experienced pediatric specialists to identify your child\'s strengths, challenges, and areas for growth.',
  },
  {
    icon: <Brain className="w-10 h-10 text-primary" />,
    title: 'Behavioral Support & Therapy',
    description:
      'Specialized interventions for children with behavioral challenges, ADHD, autism spectrum disorders, and emotional regulation difficulties.',
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-primary" />,
    title: 'Speech & Language Development',
    description:
      'Expert speech therapy services for children with communication delays, articulation difficulties, and language development needs.',
  },
  {
    icon: <Baby className="w-10 h-10 text-primary" />,
    title: 'Early Intervention Programs',
    description:
      'Specialized support for toddlers and preschoolers with developmental delays, focusing on motor skills, cognitive development, and social interaction.',
  },
  {
    icon: <Target className="w-10 h-10 text-primary" />,
    title: 'Special Needs Support',
    description:
      'Comprehensive care for children with special needs, including individualized therapy plans, family support, and educational guidance.',
  },
  {
    icon: <Award className="w-10 h-10 text-primary" />,
    title: 'Family-Centered Care',
    description:
      'Collaborative approach involving parents and caregivers in the assessment process, with ongoing support and guidance for your child\'s development.',
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
      <SectionTitle dir="ltr">Our Assessment & Support Services</SectionTitle>
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
        <h3 className="text-2xl font-semibold mb-2" dir="ltr">Supporting Your Child's Development Journey</h3>
        <p className="text-lg" dir="ltr">
          Our experienced team of developmental pediatricians and child behavioral therapists in Dubai provides comprehensive assessments and evidence-based interventions to help every child reach their full potential.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
