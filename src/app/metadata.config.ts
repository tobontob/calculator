import { Metadata } from 'next';

export const baseMetadata: Partial<Metadata> = {
  metadataBase: new URL('https://calculator.ai.kr'),
};

export function createMetadata(metadata: Metadata): Metadata {
  return {
    ...baseMetadata,
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      siteName: '계산기 AI',
      locale: 'ko_KR',
      type: 'website',
    },
  };
} 