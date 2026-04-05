# Ionic + React.js Cheat Sheet

## Project Setup

### Creating a New Project
```bash
npm create ionic-app@latest my-app -- --template=react-ts
cd my-app
npm install
```

### Running the App
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

### Capacitor (Native)
```bash
npx cap add ios      # Add iOS platform
npx cap add android  # Add Android platform
npx cap sync         # Sync web assets to native
npx cap open ios     # Open iOS project in Xcode
npx cap open android # Open Android project in Android Studio
```

---

## Core Components

### IonApp, IonContent, IonPage
```tsx
import { IonApp, IonContent, IonPage } from '@ionic/react';

const MyPage = () => (
  <IonApp>
    <IonPage>
      <IonContent>
        {/* page content */}
      </IonContent>
    </IonPage>
  </IonApp>
);
```

### IonHeader, IonToolbar, IonTitle, IonButtons
```tsx
<IonHeader>
  <IonToolbar>
    <IonTitle>My App</IonTitle>
    <IonButtons slot="start">
      <IonBackButton defaultHref="/home" />
    </IonButtons>
    <IonButtons slot="end">
      <IonButton>
        <IonIcon icon={ellipsisVertical} />
      </IonButton>
    </IonButtons>
  </IonToolbar>
</IonHeader>
```

### IonList, IonItem, IonLabel, IonInput
```tsx
<IonList>
  <IonItem>
    <IonLabel>Name</IonLabel>
    <IonInput 
      value={name} 
      onIonInput={(e) => setName(e.detail.value!)} 
    />
  </IonItem>
</IonList>
```

### IonButton
```tsx
<IonButton expand="block" color="primary" onClick={handleClick}>
  Submit
</IonButton>

<IonButton fill="outline" size="small">Small</IonButton>
<IonButton fill="clear">Clear</IonButton>
```

### IonCard
```tsx
<IonCard>
  <IonCardHeader>
    <IonCardTitle>Title</IonCardTitle>
    <IonCardSubtitle>Subtitle</IonCardSubtitle>
  </IonCardHeader>
  <IonCardContent>
    Content here
  </IonCardContent>
</IonCard>
```

---

## Navigation (React Router)

### Setup in App.tsx
```tsx
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { home, settings } from 'ionicons/icons';

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);
```

### Programmatic Navigation
```tsx
import { useHistory } from 'react-router-dom';

const MyPage = () => {
  const history = useHistory();
  
  const goToDetail = (id: string) => {
    history.push(`/detail/${id}`);
  };
  
  return <IonButton onClick={() => goToDetail('123')}>Go</IonButton>;
};
```

### Using useParams
```tsx
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  return <IonContent>Item ID: {id}</IonContent>;
};
```

---

## Ionic React Hooks

### useIonToast
```tsx
import { useIonToast } from '@ionic/react';

const [present] = useIonToast();

present({
  message: 'Saved!',
  duration: 2000,
  position: 'top',
  color: 'success'
});
```

### useIonAlert
```tsx
import { useIonAlert } from '@ionic/react';

const [present] = useIonAlert();

present({
  header: 'Confirm',
  message: 'Are you sure?',
  buttons: [
    { text: 'Cancel', role: 'cancel' },
    { text: 'OK', handler: () => doSomething() }
  ]
});
```

### useIonLoading
```tsx
import { useIonLoading } from '@ionic/react';

const [present, dismiss] = useIonLoading();

present({ message: 'Loading...', duration: 3000 });
dismiss();
```

### useIonModal
```tsx
import { useIonModal } from '@ionic/react';

const ModalContent = ({ onClose }) => (
  <IonContent>
    <IonButton onClick={() => onClose('result')}>Close</IonButton>
  </IonContent>
);

const [present, dismiss] = useIonModal(ModalContent, {
  onClose: (result) => dismiss({ data: result })
});

<IonButton onClick={() => present()}>Open Modal</IonButton>
```

### useIonActionSheet
```tsx
import { useIonActionSheet } from '@ionic/react';

const [present] = useIonActionSheet();

present({
  buttons: [
    { text: 'Delete', role: 'destructive', handler: () => deleteItem() },
    { text: 'Share', handler: () => shareItem() },
    { text: 'Cancel', role: 'cancel' }
  ]
});
```

---

## Common UI Components

### IonChip
```tsx
<IonChip outline color="primary">
  <IonLabel>Tag</IonLabel>
</IonChip>
```

### IonToggle
```tsx
<IonItem>
  <IonLabel>Enable notifications</IonLabel>
  <IonToggle 
    checked={enabled} 
    onIonChange={(e) => setEnabled(e.detail.checked)} 
  />
</IonItem>
```

### IonCheckbox, IonRadio, IonSelect
```tsx
<IonCheckbox checked={checked} onIonChange={(e) => setChecked(e.detail.checked)} />

<IonRadioGroup value={choice} onIonChange={(e) => setChoice(e.detail.value)}>
  <IonItem><IonRadio value="a" /><IonLabel>Option A</IonLabel></IonItem>
  <IonItem><IonRadio value="b" /><IonLabel>Option B</IonLabel></IonItem>
</IonRadioGroup>

<IonSelect value={selected} onIonChange={(e) => setSelected(e.detail.value)}>
  <IonSelectOption value="1">One</IonSelectOption>
  <IonSelectOption value="2">Two</IonSelectOption>
</IonSelect>
```

### IonRange
```tsx
<IonRange 
  min={0} 
  max={100} 
  value={volume}
  onIonInput={(e) => setVolume(e.detail.value as number)}
>
  <IonLabel slot="start">0</IonLabel>
  <IonLabel slot="end">100</IonLabel>
</IonRange>
```

### IonSearchbar
```tsx
<IonSearchbar 
  value={searchText} 
  onIonInput={(e) => setSearchText(e.detail.value!)}
  placeholder="Search..."
/>
```

### IonRefresher (Pull to refresh)
```tsx
const handleRefresh = async (event: CustomEvent) => {
  await fetchData();
  event.detail.complete();
};

<IonContent>
  <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
    <IonRefresherContent />
  </IonRefresher>
  {/* content */}
</IonContent>
```

### IonInfiniteScroll
```tsx
const loadMore = async (event: CustomEvent) => {
  await fetchMore();
  event.detail.target.complete();
};

<IonInfiniteScroll onIonInfinite={loadMore}>
  <IonInfiniteScrollContent />
</IonInfiniteScroll>
```

### IonSegment / IonSegmentButton
```tsx
<IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value)}>
  <IonSegmentButton value="all">All</IonSegmentButton>
  <IonSegmentButton value="favorites">Favorites</IonSegmentButton>
</IonSegment>
```

### IonFab (Floating Action Button)
```tsx
<IonFab vertical="bottom" horizontal="end" slot="fixed">
  <IonFabButton>
    <IonIcon icon={add} />
  </IonFabButton>
</IonFab>
```

### IonSlides / IonSlide
```tsx
<IonSlides pager={true} options={slideOpts}>
  <IonSlide>Slide 1</IonSlide>
  <IonSlide>Slide 2</IonSlide>
  <IonSlide>Slide 3</IonSlide>
</IonSlides>
```

---

## Theming & Styling

### CSS Variables
```css
/* src/theme/variables.css */
:root {
  --ion-color-primary: #3880ff;
  --ion-color-primary-rgb: 56,128,255;
  --ion-color-primary-contrast: #ffffff;
  
  --ion-background-color: #f4f4f4;
  --ion-text-color: #1e1e1e;
  
  --ion-toolbar-background: #3880ff;
  --ion-tab-bar-background: #f4f4f4;
}
```

### Custom Component Styles
```tsx
<IonButton className="custom-button">Click Me</IonButton>

// In CSS
.custom-button {
  --background: #ff5722;
  --border-radius: 20px;
}
```

### Dark Mode
```css
@media (prefers-color-scheme: dark) {
  :root {
    --ion-background-color: #121212;
    --ion-text-color: #ffffff;
  }
}
```

---

## Capacitor APIs

### Status Bar
```tsx
import { StatusBar, Style } from '@capacitor/status-bar';

StatusBar.setStyle({ style: Style.Dark });
StatusBar.setBackgroundColor({ color: '#3880ff' });
```

### Haptics
```tsx
import { Haptics, ImpactStyle } from '@capacitor/haptics';

Haptics.impact({ style: ImpactStyle.Medium });
Haptics.notification({ type: NotificationType.Success });
```

### Keyboard
```tsx
import { Keyboard } from '@capacitor/keyboard';

Keyboard.show();
Keyboard.hide();
Keyboard.addListener('keyboardWillShow', () => {/* */});
```

---

## Lifecycle (React)

### Page Lifecycle in Ionic React
```tsx
import { useEffect } from 'react';

useEffect(() => {
  console.log('Component mounted');
  
  return () => {
    console.log('Component will unmount');
  };
}, []);
```

### IonPage Events
```tsx
<IonPage 
  onIonViewWillEnter={() => console.log('Will Enter')}
  onIonViewDidEnter={() => console.log('Did Enter')}
  onIonViewWillLeave={() => console.log('Will Leave')}
  onIonViewDidLeave={() => console.log('Did Leave')}
>
```

---

## State Management

### useState / useReducer
```tsx
const [items, setItems] = useState<Item[]>([]);
const [count, setCount] = useState(0);
```

### useContext
```tsx
const AppContext = createContext<{ theme: string; setTheme: (t: string) => void }>(null!);

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// Usage
const { theme } = useContext(AppContext);
```

---

## Icons
```tsx
import { add, heart, heartOutline, settings, home } from 'ionicons/icons';

<IonIcon icon={add} />
<IonIcon icon={heartOutline} />
<IonIcon icon={settings} />
```

---

## Forms with IonInput
```tsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

<IonItem>
  <IonLabel position="floating">Email</IonLabel>
  <IonInput 
    type="email" 
    value={email}
    onIonInput={(e) => setEmail(e.detail.value!)}
    required
  />
</IonItem>

<IonItem>
  <IonLabel position="floating">Password</IonLabel>
  <IonInput 
    type="password" 
    value={password}
    onIonInput={(e) => setPassword(e.detail.value!)}
  />
</IonItem>
```

---

## Toast / Alert / Loading Helpers

### Inline Helpers
```tsx
import { 
  toastController, 
  alertController, 
  loadingController 
} from '@ionic/react';

// Toast
const toast = await toastController.create({
  message: 'Hello',
  duration: 2000,
  color: 'success'
});
await toast.present();

// Alert
const alert = await alertController.create({
  header: 'Alert',
  message: 'This is an alert',
  buttons: ['OK']
});
await alert.present();

// Loading
const loading = await loadingController.create({
  message: 'Please wait...'
});
await loading.present();
```

---

## Grid System
```tsx
<IonGrid>
  <IonRow>
    <IonCol size="12" size-md="6">Column 1</IonCol>
    <IonCol size="12" size-md="6">Column 2</IonCol>
  </IonRow>
</IonGrid>
```

---

## Common Import Patterns
```tsx
// From @ionic/react
import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonLabel,
  IonInput,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButtons,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonToggle,
  IonCheckbox,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonRange,
  IonText,
  IonBadge,
  IonAvatar,
  IonThumbnail,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSlides,
  IonSlide,
  IonSkeletonText,
  IonModal,
  IonToast,
  IonAlert,
  IonLoading,
  IonSpinner,
  IonRippleEffect,
  useIonToast,
  useIonAlert,
  useIonLoading,
  useIonModal,
  useIonActionSheet,
  RefresherEventDetail,
  toastController,
  alertController,
  loadingController,
  actionSheetController,
  modalController,
} from '@ionic/react';

// From react-router-dom
import { 
  BrowserRouter, 
  Route, 
  Switch, 
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  Link
} from 'react-router-dom';

// From @ionic/react-router
import { IonReactRouter } from '@ionic/react-router';

// From ionicons/icons
import { 
  add, 
  remove, 
  heart, 
  heartOutline,
  settings,
  home,
  person,
  search,
  menu,
  ellipsisVertical,
  chevronBack,
  chevronForward,
  camera,
  trash,
  create,
  share,
  star,
  starOutline
} from 'ionicons/icons';
```

---

## Essential npm Commands
```bash
npm install                    # Install dependencies
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run lint                   # Run ESLint
npx cap sync                   # Sync to native projects
npx cap open ios               # Open iOS in Xcode
npx cap open android           # Open Android in Android Studio
npm run test.unit              # Run Vitest unit tests
npm run test.e2e               # Run Cypress e2e tests
```

---

## File Structure
```
src/
├── src/
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx            # Entry point
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── theme/
│   │   └── variables.css   # CSS variables & theming
│   └── setupTests.ts       # Test setup
├── public/                  # Static assets
├── android/                # Native Android project (after cap add)
├── ios/                    # Native iOS project (after cap add)
├── capacitor.config.ts     # Capacitor configuration
├── ionic.config.json       # Ionic configuration
└── package.json
```

---

## Tips

1. **Use `IonPage`** wrapper for every screen to enable proper transitions
2. **Always use `e.detail.value`** when getting input values from Ionic components
3. **Import icons** from `ionicons/icons` - don't import from the package directly
4. **Use CSS variables** for theming instead of hardcoded colors
5. **Call `event.detail.complete()`** in IonRefresher and IonInfiniteScroll when done loading
6. **Use `slot="start"` and `slot="end"`** for placing elements in toolbars and items
7. **Use `slot="fixed"`** in IonContent for elements that shouldn't scroll
8. **Wrap with `IonReactRouter`** for routing to work properly
9. **Check Capacitor plugin docs** for native functionality (status bar, camera, etc.)
10. **Use `enterAnimation` and `exitAnimation`** on modals for custom transitions
