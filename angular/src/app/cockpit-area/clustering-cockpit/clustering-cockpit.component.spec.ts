import { HttpClient } from '@angular/common/http';
import { ClusteringCockpitComponent } from './clustering-cockpit.component';
import { ClusteringService } from '../shared/clustering.service';
import { PriceCalculatorService } from '../../sidenav/shared/price-calculator.service';
import { ConfigService } from '../../core/config/config.service';
import { MenuService } from '../../menu/shared/menu.service';

describe('ClusteringCockpitComponent', () => {
  let component: ClusteringCockpitComponent;
  // tslint:disable-next-line:prefer-const
  let http: HttpClient;
  let configService: ConfigService;
  let clusteringService: ClusteringService;
  let menuService: MenuService;

  beforeEach(() => {
    configService = new ConfigService(http);
    clusteringService = new ClusteringService(
      http,
      configService,
    );
    menuService = new MenuService(
      http,
      configService,
    );
    component = new ClusteringCockpitComponent(
      clusteringService,
      menuService,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
