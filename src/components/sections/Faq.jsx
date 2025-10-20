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
    question: 'What is child development assessment?',
    answer:
      'Child development assessment is a comprehensive evaluation of your child\'s physical, cognitive, social, and emotional development to identify strengths, challenges, and areas needing support or intervention.',
  },
  {
    question: 'What age groups do you assess?',
    answer:
      'We provide assessments for children from birth to 18 years, with specialized focus on early childhood development (0-5 years) and school-age children with developmental or behavioral concerns.',
  },
  {
    question: 'What signs indicate my child needs assessment?',
    answer:
      'Common signs include delayed speech, behavioral challenges, difficulty with social interactions, learning difficulties, motor skill delays, or concerns about autism spectrum disorders.',
  },
  {
    question: 'How long does a child assessment take?',
    answer:
      'Initial assessments typically take 2-3 hours, including parent interviews, direct child observation, and standardized testing. Follow-up sessions are usually 1-2 hours.',
  },
  {
    question: 'Do you provide speech therapy in Dubai?',
    answer:
      'Yes, we offer comprehensive speech and language therapy services for children with communication delays, articulation issues, and language development needs.',
  },
  {
    question: 'What happens after the assessment?',
    answer:
      'Following the assessment, we provide a detailed report with recommendations, create an individualized intervention plan, and connect you with appropriate specialists and services.',
  },
  {
    question: 'How can I book a child assessment?',
    answer:
      'Simply call us at +971 50 754 7326 or book through our website. Our team will guide you through the assessment process and answer any questions.',
  },
  {
    question: 'Do you work with special needs children?',
    answer:
      'Absolutely. We specialize in assessments and interventions for children with autism, ADHD, learning disabilities, developmental delays, and other special needs.',
  },
  {
    question: 'Where are you located?',
    answer:
      'Our clinic is located in central Dubai with easy access. We also provide home visits throughout the city for maximum convenience.',
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
