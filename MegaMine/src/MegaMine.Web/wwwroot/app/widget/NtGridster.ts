﻿module MegaMine.Widget {

    @directive("megamine", "ntGridster")
    @inject("$timeout")
    export class NtGridster implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
            widgets: "="
        };

        public link: ng.IDirectivePrePost = {
            pre: this.preLinkFn,
            post: this.postLinkFn
        };
        public template: string = this.getTemplate();
        public controller: typeof NtGridster = NtGridster;
        public controllerAs: string = "$ctrl";

        // scope variables
        public widgets: Widget.Models.IPageWidgetModel;
        public gridsterOptions: any;

        constructor(private $timeout: ng.ITimeoutService) {

        }

        public getTemplate(): string {
            return `<div gridster="$ctrl.gridsterOptions">
                        <ul class="with-3d-shadow with-transitions">
                            <li class="widget" gridster-item="item.widgetOptions" ng-repeat="item in $ctrl.widgets">
                                <nt-widget id="{{item.dashboardPageWidgetId}}" widget="item.widget"></nt-nvd3>
                            </li>
                        </ul>
                    </div>`;
        }

        public preLinkFn(scope: INtGridsterScope, element: ng.IAugmentedJQuery,
            instanceAttributes: ng.IAttributes, $ctrl: NtGridster): void {
            const self: NtGridster = $ctrl;

            self.widgets = scope.widgets;
        }

        public postLinkFn(scope: ng.IScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtGridster): void {
            const self: NtGridster = $ctrl;

            self.gridsterOptions = $ctrl.getGridsterOptions();
        }

        private getGridsterOptions(): any {
            let self: NtGridster = this;

            return {
                margins: [35, 5],
                mobileModeEnabled: false,
                draggable: {
                    handle: "h3"
                },
                resizable: {
                    enabled: true,
                    handles: ["n", "e", "s", "w", "ne", "se", "sw", "nw"],

                    // optional callback fired when resize is started
                    start: function (event: ng.IAngularEvent, $element: ng.IAugmentedJQuery,
                                        widgetOptions: Models.IWidgetOptionsModel): void {
                        // no code 
                    },

                    // optional callback fired when item is resized,
                    resize: function (event: ng.IAngularEvent, $element: ng.IAugmentedJQuery,
                                                widgetOptions: Models.IWidgetOptionsModel): void {
                        self.$timeout(function (): void {
                            widgetOptions.chart.api.update();
                        }, 50);
                    },

                    // optional callback fired when item is finished resizing 
                    stop: function (event: ng.IAngularEvent, $element: ng.IAugmentedJQuery,
                                            widgetOptions: Models.IWidgetOptionsModel): void {
                        self.$timeout(function (): void {
                            widgetOptions.chart.api.update();
                        }, 400);
                    }
                }
            };
        }
    }

    interface INtGridsterScope extends ng.IScope {
        widgets: Widget.Models.IPageWidgetModel;
    }
}
