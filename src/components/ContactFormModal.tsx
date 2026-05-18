'use client';

import { useState, useEffect } from 'react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'project' | 'contact';
}

export default function ContactFormModal({ isOpen, onClose, initialTab = 'contact' }: ContactFormModalProps) {
  const [activeTab, setActiveTab] = useState<'project' | 'contact'>(initialTab);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTab,
          ...formData,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', projectType: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          backdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--bg)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          zIndex: 9999,
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <style>{`
          .modal-header {
            padding: 32px 32px 24px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--text);
            opacity: 0.6;
            transition: opacity 0.2s;
          }
          .modal-close:hover {
            opacity: 1;
          }
          .modal-tabs {
            display: flex;
            gap: 0;
            border-bottom: 1px solid var(--border-color);
            padding: 0 32px;
          }
          .modal-tab {
            padding: 16px 24px;
            background: none;
            border: none;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--secondary);
            cursor: pointer;
            transition: all 0.3s ease;
            border-bottom: 2px solid transparent;
            margin-bottom: -1px;
          }
          .modal-tab.active {
            color: var(--text);
            border-bottom-color: var(--accent);
          }
          .modal-content {
            padding: 32px;
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .form-label {
            display: block;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--text);
            margin-bottom: 6px;
          }
          .form-input,
          .form-textarea,
          .form-select {
            width: 100%;
            padding: 12px 14px;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 13px;
            color: var(--text);
            background-color: var(--surface);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            transition: border-color 0.3s ease;
          }
          .form-input:focus,
          .form-textarea:focus,
          .form-select:focus {
            outline: none;
            border-color: var(--accent);
          }
          .form-textarea {
            resize: vertical;
            min-height: 100px;
          }
          .form-submit {
            padding: 12px 32px;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--bg);
            background-color: var(--text);
            border: none;
            border-radius: 100px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
          }
          .form-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
          .form-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          .success-message {
            padding: 12px 16px;
            background-color: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 6px;
            color: #22c55e;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 12px;
            margin-bottom: 16px;
            animation: slideIn 0.3s ease;
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .modal-header { padding: 24px; }
            .modal-tabs { padding: 0 24px; }
            .modal-content { padding: 24px; }
            .form-row { grid-template-columns: 1fr; gap: 12px; }
            .form-input, .form-textarea, .form-select { padding: 10px 12px; font-size: 12px; }
          }
        `}</style>

        {/* Header */}
        <div className="modal-header">
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--text)',
            margin: 0,
          }}>
            {activeTab === 'project' ? 'Start a Project' : 'Contact Us'}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          <button
            className={`modal-tab ${activeTab === 'project' ? 'active' : ''}`}
            onClick={() => setActiveTab('project')}
          >
            Start a Project
          </button>
          <button
            className={`modal-tab ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Us
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">
          {submitted && (
            <div className="success-message">
              ✓ Thank you! We've received your message. We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Common Fields */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="+61 401 298 275"
                />
              </div>
              {activeTab === 'project' && (
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your company"
                  />
                </div>
              )}
              {activeTab === 'contact' && (
                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required={activeTab === 'contact'}
                    className="form-input"
                    placeholder="What is this about?"
                  />
                </div>
              )}
            </div>

            {/* Project-specific fields */}
            {activeTab === 'project' && (
              <div className="form-group">
                <label className="form-label">Project Type *</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select a project type</option>
                  <option value="logo-design">Logo Design</option>
                  <option value="branding">Branding</option>
                  <option value="web-design">Web Design</option>
                  <option value="marketing">Marketing Materials</option>
                  <option value="packaging">Packaging Design</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {/* Message field */}
            <div className="form-group">
              <label className="form-label">
                {activeTab === 'project' ? 'Project Details' : 'Message'} *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
                placeholder={activeTab === 'project' ? 'Tell us about your project...' : 'Your message...'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="form-submit"
            >
              {loading ? 'Sending...' : activeTab === 'project' ? 'Send Project Brief' : 'Send Message'}
            </button>
          </form>

          {/* Contact Info Footer */}
          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              opacity: 0.6,
              marginBottom: '12px',
            }}>
              Or reach out directly
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <a
                href="mailto:info@cithub.com.au"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                📧 info@cithub.com.au
              </a>
              <a
                href="tel:+61401298275"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                📞 +61 401 298 275
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
