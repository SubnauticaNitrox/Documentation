// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import { OsPlatformContent } from '/src/components/os-platform-content'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  OsPlatformContent,
  Tabs,
  TabItem
};