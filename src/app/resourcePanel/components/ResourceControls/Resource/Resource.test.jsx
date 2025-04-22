import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Resource from './resource';

describe('Resource component', () => {
  describe('when it is rendered with resourceName="Agua", resourceValue=75, color="bg-blue-500"', () => {
    it('should show the resource name and value', () => {
      render(
        <Resource resourceName="Agua" resourceValue={75} color="bg-blue-500" />
      );
      expect(screen.getByText('Agua')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('should apply the color class to the inner progress bar', () => {
      render(
        <Resource resourceName="Agua" resourceValue={75} color="bg-blue-500" />
      );
      // Usamos role="progressbar" solo si definimos ese role. Si no, podemos buscar por className.
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveClass('bg-blue-500');
    });

    it('should set the bar width to 75%', () => {
      render(
        <Resource resourceName="Agua" resourceValue={75} color="bg-blue-500" />
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '75%' });
    });
  });

  describe('when resourceValue is 0 or 100', () => {
    it('should set width to "0%" if resourceValue=0', () => {
      render(
        <Resource resourceName="Agua" resourceValue={0} color="bg-blue-500" />
      );
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveStyle({ width: '0%' });
    });

    it('should set width to "100%" if resourceValue=100', () => {
      render(
        <Resource resourceName="Agua" resourceValue={100} color="bg-blue-500" />
      );
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveStyle({ width: '100%' });
    });
  });

  describe('when checking tailwind styling', () => {
    it('should use bg-gray-200 for the track and additional classes for the container', () => {
      const { container } = render(
        <Resource
          resourceName="Energía"
          resourceValue={50}
          color="bg-yellow-500"
        />
      );
      const trackDiv = container.querySelector(
        '.w-full.bg-gray-200.h-4.rounded-full.overflow-hidden'
      );
      expect(trackDiv).toBeInTheDocument();
    });
    it('should use transition-all and duration-300 for the bar', () => {
      const { container } = render(
        <Resource
          resourceName="Energía"
          resourceValue={50}
          color="bg-yellow-500"
        />
      );
      const progressBar = container.querySelector(
        '.bg-yellow-500.h-full.transition-all.duration-300'
      );
      expect(progressBar).toBeInTheDocument();
    });
  });
});
