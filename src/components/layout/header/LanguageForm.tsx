import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Icon from '@/components/shared/Icon';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

import arabic from '@/../public/svg/eg.png';
import useLocale from '@/i18n/useLocale';
import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

const LANGUAGES = [
  { label: 'English', value: 'en', icon: <Icon name='english' /> },
  {
    label: 'العربية',
    value: 'ar',
    icon: (
      <img
        src={arabic}
        alt='Arabic'
        width={16}
        height={17}
        className='inline-block'
      />
    ),
  },
];

const LanguageForm = () => {
  const { isEnglish } = useLocale();
  const { i18n, t, dir } = useTranslations('forms');
  const storedLanguage =
    typeof window !== 'undefined'
      ? localStorage.getItem('language') || i18n.language
      : i18n.language;
  const formSchema = z.object({
    language: z.string({
      required_error: t('errors.language'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: storedLanguage,
    },
  });

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   if (i18n.language !== values.language) {
  //     localStorage.setItem('language', values.language);
  //     i18n.changeLanguage(values.language);
  //   }
  // };

  return (
    <Form {...form}>
      <div className='grid grid-cols-1 gap-x-6 gap-y-4 bg-white sm:grid-cols-2'>
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem className='flex flex-col pl-1 sm:col-span-2 sm:w-[calc(50%-0.75rem)]'>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    localStorage.setItem('language', value);
                    i18n.changeLanguage(value);
                    window.location.reload();
                  }}
                  value={field.value}
                  dir={dir}
                >
                  <SelectTrigger className='m-0 w-fit border-none border-secondary-100 p-0 text-secondary-900 hover:bg-primary-50'>
                    <div
                      className={`my-2 flex items-center gap-2 rounded-lg py-2 ${isEnglish ? 'pl-1' : 'pr-2'} text-secondary-900 transition-colors`}
                    >
                      <Icon
                        name='lang'
                        className='size-6'
                      />
                      <span className='text-muted-foreground transition-colors'>
                        {isEnglish ? 'English' : 'عربي'}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((language) => (
                      <SelectItem
                        key={language.value}
                        value={language.value}
                      >
                        <div className='flex items-center gap-2'>
                          {language.icon}
                          <span>{language.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className='px-4' />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default LanguageForm;
