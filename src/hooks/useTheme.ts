import colors from '../constants/colors';
import useColorScheme from './useColorScheme';

export default function useTheme() {
    const scheme = useColorScheme();
    return colors[scheme];
}