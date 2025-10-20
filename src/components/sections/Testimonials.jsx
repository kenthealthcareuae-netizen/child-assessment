import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'John Smith',
    quote:
      'Very helpful. The session with the physiotherapist was worth it. Everything was explained in detail and how to apply it at home.',
  },
  {
    name: 'Sarah Johnson',
    quote:
      'Best experience and best team. Thank you so much and appreciation to you. I recommend everyone to visit Kent Healthcare.',
  },
  {
    name: 'Michael Brown',
    quote:
      'The staff are cooperative and the therapists are very helpful in my child\'s treatment process.',
  },
  {
    name: 'Emma Wilson',
    quote:
      'This center is exceptionally organized, with a dedicated and skilled team. Thank you for ensuring a smooth experience.',
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

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background" dir="ltr">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle dir="ltr">What Our Patients Say</SectionTitle>
        {/* Limit the max width so two columns look balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-full"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-reverse space-x-4 p-4">
                    <UserCircle className="w-12 h-12 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                      <Quote className="w-8 h-8 text-accent/50 mb-2" />
                      <p className="text-foreground italic mb-4 leading-relaxed" dir="ltr">
                        "{t.quote}"
                      </p>
                      <p className="font-semibold text-primary" dir="ltr">– {t.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
