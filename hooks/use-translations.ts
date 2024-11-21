import { useTranslations } from 'next-intl';

export function useCommonTranslations() {
  const t = useTranslations('common');
  return t;
}

export function useNavTranslations() {
  const t = useTranslations('nav');
  return t;
}

export function useHomeTranslations() {
  const t = useTranslations('home');
  return t;
}

export function useCalculatorTranslations() {
  const t = useTranslations('calculators');
  return t;
}