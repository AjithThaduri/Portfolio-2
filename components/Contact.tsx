"use client";

import { useState } from "react";

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, subject, message } = formData;
        // Construct mailto link
        const mailtoLink = `mailto:Ajiththaduri1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Ajith,\n\n${message}\n\nBest,\n${name}`)}`;

        // Open default mail client
        window.location.href = mailtoLink;
    };

    return (
        <section className="min-h-[70vh] flex items-center justify-center container mx-auto px-6 py-24 relative overflow-hidden">

            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Text Side */}
                <div className="text-left">
                    <span className="text-[#ff9f43] text-sm font-bold uppercase tracking-widest mb-6 block">Contact</span>
                    <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
                        Let’s Build<br />Something <span className="text-white/30">Trustworthy</span>.
                    </h2>
                    <p className="text-lg text-white/60 mb-8 font-light leading-relaxed">
                        Ready to deploy secure, scalable AI systems? Reach out directly to discuss your project requirements.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-white/50 text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Available for new projects
                        </div>
                        <div className="flex items-center gap-3 text-white/50 text-sm">
                            <span className="w-2 h-2 bg-[#ff9f43] rounded-full"></span>
                            Response within 24 hours
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Your Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff9f43] transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Subject</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff9f43] transition-colors"
                                placeholder="Project Inquiry"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Message</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff9f43] transition-colors resize-none"
                                placeholder="Tell me about your project needs..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-[#ff9f43] text-black font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-white transition-colors duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>

            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff9f43]/5 rounded-full blur-[120px] pointer-events-none"></div>
        </section>
    );
};
