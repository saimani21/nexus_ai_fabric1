'use client';

import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DemoPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'quantumcodeworks7@gmail.com',
          subject: 'New Demo Request from Nexus AI Website'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          company: '',
          project: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#0f1419] to-[#0b1020]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-semibold">Nexus AI</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
            Let&apos;s build together
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Tell us what you have in mind and we&apos;ll schedule a personalized demo to show you how to bring it to life with Nexus AI
          </p>
        </div>

        {/* Demo Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-3 bg-white/5 border-b border-white/20">
                  <span className="text-white text-sm">🇺🇸</span>
                  <span className="text-white/60 text-sm">+1</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="(201) 555-0123"
                  className="flex-1 px-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 bg-white/5 border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="project" className="block text-sm font-medium text-white mb-2">
                What do you have in mind? *
              </label>
              <textarea
                id="project"
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Describe your project, goals, or what you'd like to see in the demo..."
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-400/90 hover:bg-cyan-300 disabled:bg-cyan-400/50 disabled:cursor-not-allowed text-[#0b1020] font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                {isSubmitting ? 'Sending...' : 'Schedule Demo'}
              </button>
              <p className="text-center text-white/40 text-sm mt-3">
                press Enter ↵
              </p>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-300 text-sm text-center">
                    ✅ Demo request sent successfully! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 text-sm text-center">
                    ❌ Failed to send demo request. Please try again or contact us directly.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>

      </main>
    </div>
  );
}
