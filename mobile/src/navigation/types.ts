import { CulturalArtifact, HeritageSite } from '@prj-van-hoa/shared';

export type RootStackParamList = {
  MainTabs: undefined;
  ArtifactDetail: {
    artifactId?: string;
    artifact?: CulturalArtifact;
    detectedName?: string;
    site?: HeritageSite;
  };
};

export type BottomTabParamList = {
  HomeTab: undefined;
  MapTab: undefined;
  ScannerTab: undefined;
  AudioTourTab: undefined;
};
