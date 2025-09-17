import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import CustomCalender from './CustomCalender';
// import CustomCheckboxInput from './CustomCheckboxInput';
import CustomDatetimePicker from './CustomDatetimePicker';
import CustomFileUploader from './CustomFileUploader';
import CustomImagesUploader from './CustomImagesUploader';
import CustomInput from './CustomInput';
import CustomMultiSelector from './CustomMultiSelector';
import CustomPasswordInput from './CustomPasswordInput';
import CustomPhoneInput from './CustomPhoneInput';
import CustomSelect from './CustomSelect';
import CustomSliderInput from './CustomSliderInput';
import CustomSwitch from './CustomSwitch';
import CustomTagsInput from './CustomTagsInput';
import CustomTextarea from './CustomTextarea';

import { passwordSchema } from '@/utils';

import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  calendar: z.coerce.date(),
  datetime: z.coerce.date(),
  input: z.string({ required_error: 'username are required' }),

  mulitSelector: z.array(z.string()).nonempty('Please at least one item'),
  password: passwordSchema,
  phone: z
    .string({ required_error: 'Phone number is required' })
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
  selector: z.string(),
  slider: z.number(),
  tags: z.array(z.string()).nonempty('Please at least one item'),
  textarea: z.string().optional(),
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: 'File size must be less than 4MB',
      }),
      { required_error: 'At least one file must be uploaded' },
    )
    .min(1, {
      message: 'At least one file must be uploaded',
    })
    .max(5, {
      message: 'Maximum 5 files are allowed',
    }),
  images: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: 'File size must be less than 4MB',
      }),
      { required_error: 'At least one image must be uploaded' },
    )
    .min(1, {
      message: 'At least one image must be uploaded',
    })
    .max(5, {
      message: 'Maximum 5 images are allowed',
    }),
  switch: z.boolean().default(false),
  // checkbox: z.boolean().default(false),
});

export default function GlobalForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mulitSelector: [],
      tags: [],
      calendar: new Date(),
      datetime: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-3xl space-y-8 px-4 py-10'
      >
        <CustomCalender
          fieldName='calendar'
          label='Date of birth'
          placeholder='Pick a date'
        />

        <CustomDatetimePicker
          fieldName='datetime'
          label='Submission Date'
        />

        <CustomInput
          fieldName='input'
          label='Username'
          placeholder='Enter your username'
        />

        <CustomMultiSelector
          fieldName='mulitSelector'
          label='Select your framework'
          placeholder='Select languages'
          items={[
            { label: 'React', value: 'React' },
            { label: 'Vue', value: 'Vue' },
            { label: 'Svelte', value: 'Svelte' },
          ]}
        />

        <CustomPasswordInput
          fieldName='password'
          label='Password'
          placeholder='Please Enter your password'
        />

        <CustomPhoneInput
          fieldName='phone'
          label='Phone number'
          placeholder='Please enter your phone number '
        />

        <CustomSelect
          fieldName='selector'
          label='Email'
          placeholder='Select a verified email to display'
          items={[
            {
              label: 'm@example.com',
              value: 'm@example.com',
            },
            {
              label: 'm@google.com',
              value: 'm@google.com',
            },
            {
              label: 'm@support.com',
              value: 'm@support.com',
            },
          ]}
        />

        <CustomSliderInput
          fieldName='slider'
          label='Price'
        />

        <CustomTagsInput
          fieldName='tags'
          label='Enter your tech stack.'
          placeholder='Enter your tags'
        />

        <CustomTextarea
          fieldName='textarea'
          label='Bio'
          placeholder='write '
        />

        <CustomFileUploader
          fieldName='files'
          label='Select File'
        />
        <CustomImagesUploader
          fieldName='images'
          label='Select Image'
        />
        <CustomSwitch
          fieldName='switch'
          label='Marketing emails'
          description='Receive emails about new products, features, and more.'
        />

        {/* <CustomCheckboxInput
          fieldName='checkbox'
          label='Use different settings for my mobile devices'
          description='You can manage your mobile notifications in the mobile settings page.'
        /> */}

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
