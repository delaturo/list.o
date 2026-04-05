import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { listOutline, gridOutline } from 'ionicons/icons';
import { TodoProvider } from './presentation/context/TodoContext';
import { ThemeProvider } from './presentation/context/ThemeContext';
import NormalView from './presentation/pages/NormalView';
import KanbanView from './presentation/pages/KanbanView';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <ThemeProvider>
    <TodoProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/normal" component={NormalView} />
            <Route path="/kanban" component={KanbanView} />
            <Route exact path="/" render={() => <Redirect to="/normal" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="normal" href="/normal">
              <IonIcon icon={listOutline} />
              <IonLabel>Normal</IonLabel>
            </IonTabButton>
            <IonTabButton tab="kanban" href="/kanban">
              <IonIcon icon={gridOutline} />
              <IonLabel>Kanban</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonReactRouter>
      </IonApp>
    </TodoProvider>
  </ThemeProvider>
);

export default App;
