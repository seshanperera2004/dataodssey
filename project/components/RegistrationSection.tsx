'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, CheckCircle2, AlertCircle, User, Mail, Phone, Building2, Users, Loader2, X, LucideIcon } from 'lucide-react';

const memberSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
});

const formSchema = z.object({
  teamName: z.string().min(2, 'Team name must be at least 2 characters'),
  universityName: z.string().min(2, 'University name required'),
  leaderName: z.string().min(2, 'Full name required'),
  leaderEmail: z.string().email('Valid email required'),
  leaderPhone: z.string().min(9, 'Valid phone required'),
  leaderWhatsapp: z.string().min(9, 'Valid WhatsApp number required'),
  members: z.array(memberSchema),
});

type FormData = z.infer<typeof formSchema>;

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon: LucideIcon;
}

function InputField({ label, error, icon: Icon, ...props }: InputFieldProps) {
  return (
    <div>
      <label className="block text-[10px] sm:text-xs font-mono text-white/50 mb-1.5 sm:mb-2 tracking-wider uppercase">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon className={"w-3.5 sm:w-4 h-3.5 sm:h-4 text-white/30"} />
        </div>
        <input
          {...props}
          className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white/[0.04] border rounded-lg sm:rounded-xl text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 transition-all duration-300 ${
            error
              ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/30'
              : 'border-white/[0.08] focus:border-cyan-500/50 focus:ring-cyan-500/20 hover:border-white/15'
          }`}
        />
      </div>
      {error && (
        <p className="mt-1 text-[10px] sm:text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function RegistrationSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { members: [{ name: '', email: '' }, { name: '', email: '' }, { name: '', email: '' }] },
  });

  const validateFile = (f: File | null | undefined) => {
    if (!f) return;
    if (f.type !== 'application/pdf') { setFileError('Only PDF files are accepted'); return; }
    if (f.size > 5 * 1024 * 1024) { setFileError('File must be under 5MB'); return; }
    setFile(f);
    setFileError('');
  };

  const onSubmit = async (_data: FormData) => {
    if (!file) { setFileError('Please upload your proposal PDF'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
    reset();
    setFile(null);
  };

  if (submitted) {
    return (
      <section id="register" className="relative py-20 sm:py-24 bg-[#050816]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="p-8 sm:p-12 rounded-2xl sm:rounded-3xl glass-card border border-cyan-500/30 shadow-glow-cyan"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-5 sm:mb-6"
            >
              <CheckCircle2 className="w-8 sm:w-10 h-8 sm:h-10 text-cyan-400" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Registration Successful!
            </h3>
            <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8">
              Your team has been registered. We'll contact your team leader within 5 business days.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-[#050816] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-glow-cyan"
            >
              Register Another Team
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="relative py-20 sm:py-24 lg:py-32 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/4 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl xl:max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-cyan-500/20 mb-4 sm:mb-6">
            <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
              Team Registration
            </span>
          </div>
          <h2
            className="font-bold text-white mb-3 sm:mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.75rem, 6vw, 3.75rem)',
            }}
          >
            REGISTER YOUR{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TEAM
            </span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base px-2">
            Fill in your team details and upload your project proposal to secure your spot.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 sm:space-y-6 lg:space-y-8"
        >
          {/* Team info */}
          <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl glass-card border border-white/[0.06]">
            <h3 className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4 sm:mb-6">
              01 — Team Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <InputField label="Team Name" icon={Users} placeholder="e.g., DataPioneers" error={errors.teamName?.message} {...register('teamName')} />
              <InputField label="University Name" icon={Building2} placeholder="e.g., University of Colombo" error={errors.universityName?.message} {...register('universityName')} />
            </div>
          </div>

          {/* Team leader */}
          <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl glass-card border border-white/[0.06]">
            <h3 className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4 sm:mb-6">
              02 — Team Leader
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="col-span-1 sm:col-span-2">
                <InputField label="Full Name" icon={User} placeholder="Full name" error={errors.leaderName?.message} {...register('leaderName')} />
              </div>
              <InputField label="Email Address" icon={Mail} type="email" placeholder="leader@university.edu" error={errors.leaderEmail?.message} {...register('leaderEmail')} />
              <InputField label="Phone Number" icon={Phone} type="tel" placeholder="+94 7X XXX XXXX" error={errors.leaderPhone?.message} {...register('leaderPhone')} />
              <div className="col-span-1 sm:col-span-2">
                <InputField label="WhatsApp Number" icon={Phone} type="tel" placeholder="+94 7X XXX XXXX" error={errors.leaderWhatsapp?.message} {...register('leaderWhatsapp')} />
              </div>
            </div>
          </div>

          {/* Members */}
          <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl glass-card border border-white/[0.06]">
            <h3 className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4 sm:mb-6">
              03 — Team Members <span className="text-white/25 normal-case">(Optional)</span>
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <InputField label={`Member ${i + 2} Name`} icon={User} placeholder="Full name (optional)" {...register(`members.${i}.name`)} />
                  <InputField label={`Member ${i + 2} Email`} icon={Mail} type="email" placeholder="Email (optional)" error={errors.members?.[i]?.email?.message} {...register(`members.${i}.email`)} />
                </div>
              ))}
            </div>
          </div>

          {/* Proposal */}
          <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl glass-card border border-white/[0.06]">
            <h3 className="text-[10px] sm:text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4 sm:mb-6">
              04 — Project Proposal
            </h3>

            {file ? (
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-white font-medium truncate">{file.name}</p>
                  <p className="text-[10px] sm:text-xs text-white/40">{(file.size / 1024).toFixed(0)} KB · PDF</p>
                </div>
                <button type="button" onClick={() => setFile(null)} className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white transition-colors">
                  <X className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); validateFile(e.dataTransfer.files[0]); }}
                className={`cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-3 py-10 sm:py-12 rounded-xl sm:rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isDragging ? 'border-cyan-500/60 bg-cyan-500/10' : fileError ? 'border-red-500/40 bg-red-500/5' : 'border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.02]'
                }`}
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <Upload className="w-5 sm:w-6 h-5 sm:h-6 text-white/40" />
                </div>
                <div className="text-center px-4">
                  <p className="text-xs sm:text-sm text-white/70 font-medium mb-1">
                    Drop your PDF here, or{' '}
                    <span className="text-cyan-400">browse</span>
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/30">PDF only · Max 5MB</p>
                </div>
                <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => validateFile(e.target.files?.[0])} />
              </div>
            )}
            {fileError && (
              <p className="mt-1.5 text-[10px] sm:text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {fileError}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3.5 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-semibold text-[#050816] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl sm:rounded-2xl transition-all shadow-glow-cyan hover:shadow-glow-lg-cyan"
          >
            {loading ? (
              <><Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" /> Submitting...</>
            ) : (
              <><CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5" /> Submit Team Registration</>
            )}
          </motion.button>

          <p className="text-center text-[10px] sm:text-xs text-white/30">
            By registering, you agree to the competition rules and guidelines.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
