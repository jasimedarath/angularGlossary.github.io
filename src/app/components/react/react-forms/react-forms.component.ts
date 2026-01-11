import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';

@Component({
  selector: 'app-react-forms',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-forms.component.html',
  styleUrl: './react-forms.component.scss'
})
export class ReactFormsComponent implements AfterViewChecked {
  
  ngAfterViewChecked() {
    Prism.highlightAll();
  }

  controlledForms = `// Controlled Form Components
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}`;

  uncontrolledForms = `// Uncontrolled Forms with useRef
import { useRef } from 'react';

function UncontrolledForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      username: usernameRef.current.value,
      email: emailRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={usernameRef} placeholder="Username" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// With FormData API
function FormDataExample() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}`;

  formValidation = `// Form Validation
function ValidatedForm() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case 'email':
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)
          ? ''
          : 'Invalid email address';
      case 'password':
        return value.length >= 8
          ? ''
          : 'Password must be at least 8 characters';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(values).forEach(key => {
      const error = validate(key, values[key]);
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form is valid:', values);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}`;

  formInputs = `// Different Input Types
function FormInputs() {
  const [form, setForm] = useState({
    text: '',
    number: 0,
    checkbox: false,
    radio: '',
    select: '',
    textarea: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form>
      <input name="text" value={form.text} onChange={handleChange} />
      
      <input name="number" type="number" value={form.number} onChange={handleChange} />
      
      <input name="checkbox" type="checkbox" checked={form.checkbox} onChange={handleChange} />
      
      <label>
        <input name="radio" type="radio" value="option1" checked={form.radio === 'option1'} onChange={handleChange} />
        Option 1
      </label>
      
      <select name="select" value={form.select} onChange={handleChange}>
        <option value="">Choose...</option>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </select>
      
      <textarea name="textarea" value={form.textarea} onChange={handleChange} />
      
      <input name="date" type="date" value={form.date} onChange={handleChange} />
    </form>
  );
}`;

  formLibraries = `// Using Formik Library
import { useFormik } from 'formik';
import * as Yup from 'yup';

function FormikExample() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(8, 'Too short').required('Required')
    }),
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email && <span>{formik.errors.email}</span>}
      
      <input
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password && <span>{formik.errors.password}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}

// React Hook Form
import { useForm } from 'react-hook-form';

function HookFormExample() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}
      
      <input {...register('password', { required: true, minLength: 8 })} />
      {errors.password && <span>Password must be 8+ chars</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}`;

  fileUpload = `// File Upload
function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {preview && <img src={preview} alt="Preview" />}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}`;

  multiStepForm = `// Multi-Step Form
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {},
    contact: {},
    preferences: {}
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  return (
    <div>
      {step === 1 && (
        <PersonalInfo
          data={formData.personal}
          onNext={(data) => { updateFormData('personal', data); nextStep(); }}
        />
      )}
      
      {step === 2 && (
        <ContactInfo
          data={formData.contact}
          onNext={(data) => { updateFormData('contact', data); nextStep(); }}
          onBack={prevStep}
        />
      )}
      
      {step === 3 && (
        <Review
          data={formData}
          onBack={prevStep}
          onSubmit={() => console.log('Final:', formData)}
        />
      )}
    </div>
  );
}`;

  bestPractices = `// Form Best Practices

// 1. Use controlled components for form state
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />

// 2. Prevent default form submission
const handleSubmit = (e) => {
  e.preventDefault();
  // Handle submission
};

// 3. Validate on blur and submit
const handleBlur = (e) => {
  validateField(e.target.name, e.target.value);
};

// 4. Show clear error messages
{errors.email && (
  <span className="error" role="alert">{errors.email}</span>
)}

// 5. Disable submit while processing
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>

// 6. Use form libraries for complex forms
// - Formik: Feature-rich, popular
// - React Hook Form: Performance-focused, minimal re-renders
// - Final Form: Subscription-based rendering

// 7. Accessibility
<label htmlFor="email">Email</label>
<input
  id="email"
  aria-label="Email address"
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby="email-error"
/>
<span id="email-error">{errors.email}</span>`;
}
