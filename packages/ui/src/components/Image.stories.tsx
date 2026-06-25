import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta: Meta<typeof Image> = {
  title: 'Media/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'select', options: ['lazy', 'eager'] },
    objectFit: { control: 'select', options: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
    rounded: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'pill', 'full'],
    },
    skeleton: { control: 'boolean' },
    aspectRatio: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'A random placeholder image',
    width: 400,
    height: 300,
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.example/broken.jpg',
    alt: 'Broken image with fallback',
    width: 400,
    height: 300,
    fallback: (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
        <span>Image unavailable</span>
      </div>
    ),
  },
};

export const LoadingSkeleton: Story = {
  args: {
    src: 'https://picsum.photos/400/300?random=1',
    alt: 'Image with loading skeleton',
    width: 400,
    height: 300,
    skeleton: true,
  },
};

export const NoSkeleton: Story = {
  args: {
    src: 'https://picsum.photos/400/300?random=2',
    alt: 'Image without loading skeleton',
    width: 400,
    height: 300,
    skeleton: false,
  },
};

export const AspectRatio: Story = {
  args: {
    src: 'https://picsum.photos/400/300?random=3',
    alt: 'Image with 16:9 aspect ratio',
    aspectRatio: '16/9',
    width: 400,
  },
};

export const ObjectFitCover: Story = {
  args: {
    src: 'https://picsum.photos/200/400',
    alt: 'Tall image with object-cover',
    width: 400,
    height: 200,
    objectFit: 'cover',
  },
};

export const ObjectFitContain: Story = {
  args: {
    src: 'https://picsum.photos/200/400',
    alt: 'Tall image with object-contain',
    width: 400,
    height: 200,
    objectFit: 'contain',
  },
};

export const RoundedVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-start">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((r) => (
        <div key={r} className="text-center">
          <Image
            src={`https://picsum.photos/100/100?random=${r}`}
            alt={`Rounded ${r}`}
            width={100}
            height={100}
            rounded={r}
            objectFit="cover"
          />
          <p className="text-xs mt-1 text-gray-500">{r}</p>
        </div>
      ))}
    </div>
  ),
};
