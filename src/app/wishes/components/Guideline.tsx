import React from 'react';
import GuidelineCard from './GuidelineCard';

const GUIDELINE_CARDS: { title: string; content: React.ReactNode }[] = [
  {
    title: 'Introduction',
    content: (
      <div className="text-[18px] md:text-[16px] leading-[calc(151/126)]">
        The Guardian Challenge is a global initiative that seeks innovative
        solutions in the field of artificial intelligence (AI) & Quantum
        computing. This document outlines the process for individuals or teams
        to submit their proposals for evaluation by a jury. The winning
        proposal, which best meets the challenge requirements, will be selected
        as the winner and receive the indicated prizes. For coding challenges,
        participants are required to share links to open-source code on GitHub,
        associated documentation, along with a detailed video demonstration and
        their contact information.
      </div>
    ),
  },
  {
    title: 'Understanding the Challenge',
    content: (
      <div className="text-[18px] md:text-[16px] leading-[calc(151/126)]">
        Read the challenge description carefully to grasp the problem statement,
        objectives, evaluation criteria, and any specific requirements or
        constraints. Ensure that your solution aligns with the provided
        guidelines.
      </div>
    ),
  },
  {
    title: 'Solution Development',
    content: (
      <div className="text-[18px] md:text-[16px] leading-[calc(151/126)]">
        Develop your solution by employing your knowledge of AI and related
        technologies. Be creative, innovative, and consider practical
        applications of your solution. Take into account any specifications or
        limitations mentioned in the challenge.
      </div>
    ),
  },
  {
    title: 'Documentation',
    content: (
      <div className="text-[18px] md:text-[16px] leading-[calc(151/126)]">
        <p className="mb-[20px]">
          Prepare a comprehensive document that outlines your solution. It
          should include the following sections:
        </p>
        <ul className="pl-[30px]">
          <li className="list-item">
            <span className="font-[700]">Introduction:</span> Provide a brief
            overview of the problem statement and the significance of your
            solution.
          </li>
          <li className="list-item">
            <span className="font-[700]">Methodology:</span> Explain the
            approach you adopted to tackle the problem, including the
            algorithms, techniques, and tools utilized. Describe any unique
            features or aspects of your solution.
          </li>
          <li className="list-item">
            <span className="font-[700]">Implementation:</span> Detail the steps
            taken to implement your solution, including the libraries, used.
            Share the link to your open-source code on GitHub.
          </li>
          <li className="list-item">
            <span className="font-[700]">Results and Evaluation:</span> Present
            the results obtained from testing and evaluating your solution.
            Discuss any challenges faced during implementation and how you
            overcame them.
          </li>
          <li className="list-item">
            <span className="font-[700]">Video Demonstration:</span> Create a
            detailed video that demonstrates your solution in action. Explain
            the functionalities, highlight key features, and showcase the
            benefits of your solution. The video should be easily understandable
            to viewers.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Python',
    content: (
      <div className="text-[18px] md:text-[16px] leading-[calc(151/126)]">
        For coding solutions, it is required that the submissions are based on
        the Python programming language, with the ideal utilization of the
        Django framework. Additionally, it is recommended to incorporate vector
        database structures into the solution. These requirements aim to ensure
        consistency, scalability, and efficiency in the coding solutions,
        enabling participants to leverage the power of Python, Django, and
        vector database structures to develop innovative and robust AI
        solutions.
      </div>
    ),
  },
  {
    title: 'Submission',
    content: (
      <div className="text-[18px] md:text-[16px] leading-[calc(151/126)]">
        Submit your solution according to the submission guidelines provided for
        The Guardian Challenge. This typically involves sending your solution
        document, GitHub and video link, along with any supporting files or
        resources.
      </div>
    ),
  },
  {
    title: 'Evaluation and Selection',
    content: (
      <div className="text-[18px] md:text-[16px] leading-[calc(151/126)]">
        A jury of experts will evaluate the submitted proposals based on the
        evaluation criteria outlined in the challenge description. They will
        assess the feasibility, creativity, technical merit, and practicality of
        each solution.
      </div>
    ),
  },
  {
    title: 'Winner Announcement',
    content: (
      <>
        <div className="text-[18px] md:text-[16px] leading-[calc(151/126)] mb-[30px]">
          Once the evaluation process is complete, the jury will select the
          winning solution that best meets the challenge requirements. The
          winner will be notified through the contact information provided and
          publicly announced on The Guardian Challenge platform or relevant
          channels.
        </div>
        <div className="text-[18px] md:text-[16px] leading-[calc(151/126)]">
          The jury of The Guardian Challenge holds the absolute and sole
          discretion to reward the prize to the solution they deem most
          deserving. Their decision is final and cannot be disputed. The jury
          evaluates all submissions based on the provided evaluation criteria
          and reserves the right to select the winning solution at any moment
          they deem appropriate. Participants should understand and respect the
          authority and judgement of the jury in the selection process.
        </div>
      </>
    ),
  },
  {
    title: 'Conclusion',
    content: (
      <>
        <div className="text-[18px] md:text-[16px] leading-[calc(151/126)] mb-[30px]">
          Submitting your solution to The Guardian Challenges requires careful
          consideration, comprehensive documentation, and effective
          communication. By following these guidelines and presenting your
          solution in a clear and detailed manner, you increase your chances of
          being recognized for your innovative contribution to the field of AI.
        </div>
        <div className="text-[18px] md:text-[16px] leading-[calc(151/126)]">
          Remember to review the specific guidelines and instructions provided
          for each challenge, as they may vary. Good luck with your submission!
        </div>
      </>
    ),
  },
];

const Guideline = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      {GUIDELINE_CARDS.map(({ title, content }) => (
        <GuidelineCard key={title} title={title} content={content} />
      ))}
    </div>
  );
};

export default Guideline;
