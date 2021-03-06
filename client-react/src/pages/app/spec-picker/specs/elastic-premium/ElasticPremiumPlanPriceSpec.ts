import { CommonConstants } from '../../../../../utils/CommonConstants';
import { ServerFarmSkuConstants } from '../../../../../utils/scenario-checker/ServerFarmSku';
import { AppKind } from '../../../../../utils/AppKind';
import { PlanSpecPickerData, SpecColorCodes } from '../PriceSpec';
import { style } from 'typestyle';
import { DV2SeriesPriceSpec } from '../DV2SeriesPriceSpec';
import { ArmObj, Sku, ServerFarm } from '../../../../../models/WebAppModels';
import i18next from 'i18next';

export abstract class ElasticPremiumPlanPriceSpec extends DV2SeriesPriceSpec {
  constructor(t: i18next.TFunction) {
    super(
      t,
      ServerFarmSkuConstants.Tier.elasticPremium,
      'Elastic Premium is not supported for this scale unit. Please consider redeploying or cloning your app.',
      CommonConstants.Links.premiumV2NotAvailableLearnMore
    );
    this.tier = ServerFarmSkuConstants.Tier.elasticPremium;
    this.featureItems = [
      {
        id: 'pricing_rapidScale',
        iconUrl: 'image/scale-up.svg',
        title: t('pricing_rapidScale'),
        description: t('pricing_rapidScaleDesc'),
      },
      {
        id: 'pricing_virtualNetwork',
        iconUrl: 'image/networking.svg',
        title: t('pricing_virtualNetwork'),
        description: t('pricing_isolatedNetworkDesc'),
      },
      {
        id: 'pricing_highDensity',
        iconUrl: 'image/slots.svg',
        title: t('pricing_highDensity'),
        description: t('pricing_highDensityDesc'),
      },
      {
        id: 'pricing_customDomainsSsl',
        iconUrl: 'image/ssl.svg',
        title: t('pricing_customDomainsSsl'),
        description: t('pricing_customDomainsIpSslDesc'),
      },
      {
        id: 'pricing_trafficManager',
        iconUrl: 'image/globe.svg',
        title: t('pricing_trafficManager'),
        description: t('pricing_trafficManagerDesc'),
      },
    ];

    this.hardwareItems = [
      {
        id: 'pricing_includedHardware_azureComputeUnits',
        iconUrl: 'image/app-service-plan.svg',
        title: t('pricing_includedHardware_azureComputeUnits'),
        description: t('pricing_computeDedicatedAcu'),
        learnMoreUrl: CommonConstants.Links.azureComputeUnitLearnMore,
      },
      {
        id: 'memory',
        iconUrl: 'image/website-power.svg',
        title: t('memory'),
        description: t('pricing_dedicatedMemory'),
      },
    ];

    this.cssClass = style({
      background: SpecColorCodes.PREMIUM,
    });
  }

  protected _matchSku(sku: Sku): boolean {
    return sku.name.toLowerCase().startsWith('ep');
  }

  protected _shouldHideForNewPlan(data: PlanSpecPickerData): boolean {
    return !!data.hostingEnvironmentName || data.isXenon || !data.isElastic;
  }

  protected _shouldHideForExistingPlan(plan: ArmObj<ServerFarm>): boolean {
    return (
      !!plan.properties.hostingEnvironmentProfile || plan.properties.isXenon || !AppKind.hasAnyKind(plan, [CommonConstants.Kinds.elastic])
    );
  }
}
