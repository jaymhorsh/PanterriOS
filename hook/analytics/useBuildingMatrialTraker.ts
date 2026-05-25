'use client';

import { BuildingMatrialTraker } from '@/services/analytics';
import { useQuery } from '@tanstack/react-query';

export const useBuildingMatrialTraker = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['analytics', 'building-material-tracker'],
    queryFn: () => BuildingMatrialTraker(),
  });
  return { data, error, isLoading };
};
