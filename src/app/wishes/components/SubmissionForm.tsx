'use client';

import React, { FormEvent, useState } from 'react';
import Input from './Input';
import Button from './Button';
import Checkbox from './Checkbox';
import Select from './Select';
import Link from 'next/link';
import schema from '@/lib/schemas/submition-form.schema';
import { useAlert } from '@/lib/hooks/use-alert';

const CHALLENGES = [
  'A.G.A. Celestial Body',
  'Psychological well-being',
  'Global Healthcare',
  'Free Education',
  'Omnipresent Internet',
  'Universal Basic Income',
  'Scientific Discovery',
  'QuantumPyramid Computer ',
];

const SubmissionForm = () => {
  const { alertComponent, open } = useAlert();
  const [challenge, setChallenge] = useState<string>('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string | string[] | boolean> = {}; // Object to store the form values

    // Loop through the FormData entries and populate formValues object
    fd.forEach((value, name) => {
      data[name] = value as string;
    });
    data['challenge'] = challenge;
    data['participants'] = (data['participants'] as string).split(',')
    const validation = schema.safeParse(data);

    if (validation.success) {
      // make request to next api
      open('Successfully submitted', 'success');
      return;
    }
    open(
      validation.error.errors.map((i) => i.message).join('\n'),
      'error',
    );
  };
  return (
    <>
      <form
        className="bg-card p-[50px] rounded-[4px] flex flex-col gap-[50px] text-start md:p-[50px_0] md:bg-transparent"
        onSubmit={handleSubmit}
      >
        <div>
          <h6 className="text-[16px] leading-[calc(12/16)] font-[500] mb-[50px]">
            You are submitting a solution/s as:
          </h6>
          <div className="flex gap-[40px]">
            <Checkbox type="radio" name="type" value="Individual">
              Individual
            </Checkbox>
            <Checkbox type="radio" name="type" value="Team">
              Team
            </Checkbox>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <Select
            placeholder="Choose the challenge"
            value={challenge}
            options={CHALLENGES}
            onChange={setChallenge}
          />
          <Input name="name" placeholder="Name" />
          <Input
            name="participants"
            placeholder="Who worked on this project (names, separated with coma)"
          />
          <Input name="email" placeholder="Email" />
          <Input name="phone" placeholder="Phone (optional)" />
        </div>

        <div>
          <h6 className="text-[16px] leading-[calc(12/16)] font-[500]">
            Paste your solution content links:
          </h6>
        </div>

        <div className="flex flex-col gap-[10px]">
          <Input
            name="document_link"
            placeholder="Document link to highlight your solution"
          />
          <Input
            name="github_link"
            placeholder="GitHub link to view the code"
          />
          <Input
            name="video_link"
            placeholder="Link to video with demo of the solution"
          />
        </div>

        <div className="flex gap-[50px] md:flex-col">
          <div className="flex-1">
            <Checkbox name="privacy">
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
      {alertComponent}
    </>
  );
};

export default SubmissionForm;
