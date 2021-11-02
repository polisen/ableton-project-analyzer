import * as React from 'react';

export default function Suspense({ loading, placeholder, children }: any) {
  if (loading) {
    return placeholder;
  }
  return <>{children}</>;
}
