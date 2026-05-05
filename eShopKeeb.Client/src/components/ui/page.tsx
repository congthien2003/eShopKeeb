import React from 'react';
import { Typography } from './typography';

type Props = {
  title: string;
  children?: React.ReactNode;
};

function Page({ title, children }: Props) {
  return (
    <>
      <div className="p-4">
      <Typography children={title} variant="h4-bold" />
      <div>{children}</div>
      </div>
    </>
  );
}

export default Page;
