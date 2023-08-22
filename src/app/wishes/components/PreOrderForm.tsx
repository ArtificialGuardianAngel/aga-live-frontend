'use client';
import React, { FormEvent, Suspense } from 'react';
import Link from 'next/link';
import Checkbox from './Checkbox';
import Button from './Button';
import Input from './Input';
import { useAlert } from '@/lib/hooks/use-alert';
import schema from '@/lib/schemas/preorder-form.schema';

const PreOrderForm: React.FC<{}> = () => {
  const { open, alertComponent } = useAlert();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const fd = new FormData(e.currentTarget);

    const data: Record<string, any> = {};

    fd.forEach((value, key) => {
      if (value) data[key] = value;
    });

    console.log(data);

    const validation = schema.safeParse(data);
    if (validation.success) {
      return;
    }
    console.log(validation.error.errors);
    open(validation.error.errors.map((i) => i.message).join('\n'), 'error');
  };
  return (
    <div className="flex flex-col gap-[50px]">
      <div className="text-center">
        <h2 className="mb-[30px] text-[40px] leading-[calc(29/40)] font-[200] text-accentGreen md:text-[26px] md:leading-none">
          Pre-order form
        </h2>
        <h4 className="text-[18px] md:text-[16px]">
          Fill the form below with contact person information.
        </h4>
      </div>

      <form
        className="bg-card p-[50px] rounded-[4px] flex flex-col gap-[50px] text-start md:p-[50px_20px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[10px]">
          <Input name="name" placeholder="Name" />
          <Input name="email" placeholder="Email address" />
          <Input name="phone" placeholder="Phone (optional)" />
        </div>

        <div className="flex gap-[50px] md:flex-col">
          <div className="flex-1">
            <Checkbox>
              I accept{' '}
              <Link className="underline" href="/privacy-policy">
                Privacy Policy
              </Link>
              .
            </Checkbox>
          </div>
          <Button size="lg">Submit solution</Button>
        </div>
      </form>
      <Suspense>{alertComponent}</Suspense>
    </div>
  );
};

export default PreOrderForm;
