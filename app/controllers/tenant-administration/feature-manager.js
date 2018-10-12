import BaseController from '../../framework/base-controller';

export default BaseController.extend({
	'breadcrumbStack': null,

	init() {
		this._super(...arguments);
		this.set('permissions', ['feature-manager-read']);
	},

	setSelectedFeature(featureModel) {
		if(!featureModel) {
			this.set('model', null);
			this.set('breadcrumbStack', null);

			return;
		}

		featureModel.reload()
		.then((reloadedModel) => {
			this.set('model', reloadedModel);

			let currentFeature = reloadedModel;
			const breadcrumbHierarchy = [];

			while(currentFeature) {
				if(currentFeature.get('path')) breadcrumbHierarchy.unshift(currentFeature);
				currentFeature = currentFeature.get('parent');
			}

			this.set('breadcrumbStack', breadcrumbHierarchy);
		})
		.catch((err) => {
			this.get('notification').display({
				'type': 'error',
				'error': err
			});
		});
	}
});
