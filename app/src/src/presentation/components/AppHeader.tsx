import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';
import { useTheme } from '../context/ThemeContext';

interface AppHeaderProps {
  title: string;
  onAdd?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, onAdd }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        {onAdd && (
          <IonButton slot="end" onClick={onAdd}>Add</IonButton>
        )}
        <IonButton slot="end" onClick={toggleTheme}>
          <IonIcon icon={isDark ? sunny : moon} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};
