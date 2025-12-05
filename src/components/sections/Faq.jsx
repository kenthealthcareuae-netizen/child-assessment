import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'What is a child development assessment?',
    answer:
      'A comprehensive evaluation of your child\'s physical, cognitive, social, and emotional development. Our developmental pediatricians identify your child\'s strengths and areas that may need support, creating a personalized plan for their growth.',
  },
  {
    question: 'What age groups do you work with?',
    answer:
      'We provide assessments and support for children from birth to 18 years. Our team specializes in early childhood development (0-5 years) and has extensive experience with school-age children facing developmental or behavioral challenges.',
  },
  {
    question: 'When should I consider an assessment for my child?',
    answer:
      'Consider an assessment if you notice delayed speech, behavioral challenges, difficulty with social interactions, learning difficulties, motor skill delays, or if you have concerns about your child\'s development compared to their peers.',
  },
  {
    question: 'How long does the assessment process take?',
    answer:
      'Initial assessments typically take 2-3 hours, including detailed parent interviews, direct child observation, and standardized testing. Follow-up sessions are usually 1-2 hours, depending on your child\'s needs.',
  },
  {
    question: 'Do you offer speech therapy services?',
    answer:
      'Yes, our speech and language therapists provide comprehensive services for children with communication delays, articulation difficulties, and language development needs. We work closely with families to support communication growth.',
  },
  {
    question: 'What happens after the assessment?',
    answer:
      'You\'ll receive a detailed report with our findings and recommendations. We\'ll create an individualized intervention plan and connect you with appropriate specialists and services to support your child\'s development.',
  },
  {
    question: 'How do I book an assessment?',
    answer:
      'Contact us at +971 50 754 7326 or use our online booking form. Our team will guide you through the process, answer your questions, and help you prepare for your child\'s assessment.',
  },
  {
    question: 'Do you work with children with special needs?',
    answer:
      'Absolutely. Our team has extensive experience with children with autism, ADHD, learning disabilities, developmental delays, and other special needs. We provide specialized assessments and create tailored intervention plans.',
  },
  {
    question: 'Where are you located?',
    answer:
      'Our clinic is located at Kent Healthcare LLC, Nashwan Building – 208C Al Mankhool Rd – above Emirates NBD Bank – Al Raffa – Dubai (PO Box – 123657). We also provide home visits throughout the city for maximum convenience.',
  },
  {
    question: 'What have previous patients experienced?',
    answer:
      `"After my stroke, I couldn't walk or lift my arm. Kent's treatment helped me regain stability and confidence in weeks." – Sarah, 58\n\n` +
      `"Their home program after knee surgery made my recovery smooth. The team was professional and caring." – David, 64`,
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

const FaqSection = () => (
  <section id="faq" className="py-16 md:py-24 bg-secondary/30" dir="ltr">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle dir="ltr">Frequently Asked Questions</SectionTitle>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-card p-6 sm:p-8 rounded-lg shadow-xl border border-primary/10"
      >
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border-b border-border last:border-b-0 rounded-md overflow-hidden transition-all hover:shadow-md bg-background/50 hover:bg-background"
            >
              <AccordionTrigger className="text-md sm:text-lg font-medium text-start px-6 py-4 flex justify-between items-center w-full hover:text-accent" dir="ltr">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed px-6 pb-4 pt-2 text-sm sm:text-base" dir="ltr">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
