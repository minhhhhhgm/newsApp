// export const useStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
//     create: (theme: Theme) => T | NamedStyles<T>,
//     deps: DependencyList = [],
//   ): T => {
//     const theme = useTheme();
//     // I wish exhaustive-deps could check also custom hooks somehow.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     return useMemo(() => StyleSheet.create(create(theme)), [
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       ...deps,
//       theme,
//     ]);
//   };
  
//   const styles = useStyles((theme) => ({
//     text: {
//       marginVertical: theme.spacing.smaller,
//     },
//   }));