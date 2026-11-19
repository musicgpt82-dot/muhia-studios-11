import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState } from 'react';
import { Send, MapPin, Phone, Mail, Instagram, ArrowUpRight, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.1 });

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const inputClass = 'w-full bg-transparent border-b border-white/10 py-3 text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-purple transition-colors duration-300';

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-light/20 to-bg" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.span
            className="text-gold text-xs tracking-[0.4em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Let's Create
          </motion.span>
          <motion.h2
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-light mt-4 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Get in <span className="italic text-purple-light">Touch</span>
          </motion.h2>
          <motion.div
            className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-purple to-transparent"
            initial={{ scaleX: 0 }}
            animate={titleVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Info Side */}
          <motion.div
            className="lg:col-span-2 space-y-10"
            initial={{ opacity: 0, x: -40 }}
            animate={formVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-text-muted leading-relaxed">
              Ready to bring your vision to life? Whether it's a commercial shoot, a wedding film, 
              or a full-scale production — we'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 border border-purple/30 text-purple">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Studio Location</p>
                  <p className="text-text-muted text-sm mt-1">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 border border-purple/30 text-purple">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Email Us</p>
                  <p className="text-text-muted text-sm mt-1">hello@muhiastudios.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 border border-purple/30 text-purple">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <p className="text-text-muted text-sm mt-1">+254 700 000 000</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-text-dim mb-4">Follow Us</p>
              <div className="flex gap-3">
                {['Instagram', 'YouTube', 'Vimeo', 'TikTok'].map(social => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 border border-white/10 text-xs tracking-[0.1em] uppercase text-text-muted hover:border-purple/40 hover:text-purple transition-all duration-300 flex items-center gap-1"
                  >
                    {social}
                    <ArrowUpRight size={10} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            ref={formRef}
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            animate={formVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {sent ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center p-12 border border-purple/20 bg-bg-card/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={48} className="text-purple mb-6" />
                <h3 className="font-heading text-3xl font-light">Message Sent!</h3>
                <p className="text-text-muted mt-4 max-w-sm">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 px-8 py-3 border border-purple/50 text-sm tracking-[0.15em] uppercase hover:bg-purple transition-all duration-300"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 p-8 md:p-12 border border-white/5 bg-bg-card/30">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-dim">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-dim">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-dim">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+254 700 000 000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-text-dim">Service</label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className={`${inputClass} bg-bg-card`}
                    >
                      <option value="">Select a service</option>
                      <option value="Photography">Photography</option>
                      <option value="Videography">Videography</option>
                      <option value="Film Production">Film Production</option>
                      <option value="Post Production">Post Production</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase text-text-dim">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="group w-full py-4 bg-purple hover:bg-purple-light disabled:opacity-50 text-white text-sm tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-3"
                >
                  {sending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
