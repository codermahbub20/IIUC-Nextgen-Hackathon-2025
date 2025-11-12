import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Globe, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
}

interface Country {
  name: string;
  code: string;
  flag: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    countryCode: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  const countries: Country[] = [
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
    { name: 'Germany', code: '+49', flag: '🇩🇪' },
    { name: 'France', code: '+33', flag: '🇫🇷' },
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
    { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
    { name: 'Albania', code: '+355', flag: '🇦🇱' },
    { name: 'Algeria', code: '+213', flag: '🇩🇿' },
    { name: 'Spain', code: '+34', flag: '🇪🇸' },
    { name: 'Italy', code: '+39', flag: '🇮🇹' },
    { name: 'Japan', code: '+81', flag: '🇯🇵' },
    { name: 'China', code: '+86', flag: '🇨🇳' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷' },
    { name: 'Mexico', code: '+52', flag: '🇲🇽' },
    { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
    { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
    { name: 'Sweden', code: '+46', flag: '🇸🇪' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const services: string[] = [
    'Software Development',
    'Workflow Automation',
    'Product Design (UI/UX)',
    'AI Consultancy & Tools',
    'System Integration',
    'Data & Insights Dashboards',
    'General Enquiry'
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setShowServiceDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleCountrySelect = (country: Country) => {
    setFormData(prev => ({ 
      ...prev, 
      countryCode: `${country.flag} ${country.code}` 
    }));
    setShowCountryDropdown(false);
    setCountrySearch('');
    
    if (errors.phone) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
    setShowServiceDropdown(false);
    
    if (errors.service) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.service;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{6,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      alert('Thank you! Your message has been sent successfully.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1">
            <div className="mb-8 lg:mb-12">
              <h1 className="text-xl sm:text-xl lg:text-3xl font-bold text-gray-900 mb-2">
                Let's Build
              </h1>
              <h2 className="text-xl sm:text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                What's Next. Together.
              </h2>
              <p className="text-gray-600 text-sm">
                Have a project in mind? We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <div className="space-y-2">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name *"
                  className={`w-full px-3 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'ring-2 ring-red-500' : 'focus:ring-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email *"
                  className={`w-full py-2 p-2 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? 'ring-2 ring-red-500' : 'focus:ring-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input with Country Selector */}
              <div className="relative" ref={countryDropdownRef}>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                    aria-label="Select country code"
                  >
                    {formData.countryCode || <Globe className="w-3 h-3 text-gray-600" />}
                    <ChevronDown className={`w-2 h-2 text-gray-600 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    className={`flex-1 p-2 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone ? 'ring-2 ring-red-500' : 'focus:ring-gray-300'
                    }`}
                  />
                </div>
                
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}

                {/* Country Dropdown */}
                {showCountryDropdown && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl">
                    <div className="p-3 border-b border-gray-200">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search country..."
                          className="flex-1 bg-transparent outline-none text-sm text-gray-600"
                        />
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                          >
                            <span className="text-2xl">{country.flag}</span>
                            <span className="text-gray-700 flex-1">{country.name}</span>
                            <span className="text-gray-500">{country.code}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-500 text-sm text-center">
                          No countries found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Service Selector */}
              <div className="relative" ref={serviceDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                  className={`w-full px-4 py-4 bg-gray-100 rounded-lg text-left flex items-center justify-between hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 ${
                    errors.service ? 'ring-2 ring-red-500' : 'focus:ring-gray-300'
                  }`}
                >
                  <span className={formData.service ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.service || 'Which service do you need? *'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${showServiceDropdown ? 'rotate-180' : ''}`} />
                </button>

                {errors.service && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.service}
                  </p>
                )}

                {/* Service Dropdown */}
                {showServiceDropdown && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleServiceSelect(service)}
                        className="w-full p-2 text-left hover:bg-gray-50 transition-colors text-gray-700 border-b border-gray-100 last:border-0"
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message (Optional)"
                  rows={4}
                  className="w-full px-4 py-4 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-full min-h-[400px] lg:min-h-[600px]">
              <img
                src="https://static.wixstatic.com/media/34a173_7d1605f1814f4c5e81dadbf7bbe2389c~mv2.png/v1/fill/w_965,h_698,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/34a173_7d1605f1814f4c5e81dadbf7bbe2389c~mv2.png"
                alt="Developer working on laptop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Footer Contact Info */}
        <div className="mt-12 lg:mt-16 bg-gray-900 text-white rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
            <div className="text-center sm:text-left">
              <span className="font-medium text-gray-300">Phone: </span>
              <a 
                href="tel:+1234567890" 
                className="hover:text-gray-300 transition-colors font-medium"
              >
                +1 234 567 890
              </a>
            </div>
            <div className="text-center sm:text-left">
              <span className="font-medium text-gray-300">Email: </span>
              <a 
                href="mailto:info@orbitsops.co.uk" 
                className="hover:text-gray-300 transition-colors font-medium"
              >
                info@orbitsops.co.uk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;