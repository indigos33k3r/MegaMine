﻿module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.Quarry")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.Dialog.DialogService")
    export class Quarry {

        public dashboard: Widget.Models.IDashboardModel<Quarry, Models.IQuarryModel>;

        constructor(private quarryService: QuarryService, private utility: Shared.Utility,
                            private dialogService: Shared.Dialog.DialogService<Models.IQuarryModel>) {
            const self: Quarry = this;

            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "quarryName", field: "quarryName", displayName: "Name", type: "string" },
                    { name: "colour", field: "colours", displayName: "Colour", type: "string" },
                    { name: "location", field: "location", displayName: "Location", type: "string" }
                ]
            };

            self.dashboard = {
                header: "Quarries",
                context: self,
                widgets: {
                    allWidgets: self.quarryService.quarries.widgets.allWidgets,
                    pageWidgets: self.quarryService.quarries.widgets.pageWidgets
                },
                records: {
                    options: {
                        primaryField: "quarryId",
                        data: self.quarryService.quarries.list,
                        view: self.viewDialog
                    },
                    list: {
                        options: {
                            fields: ["quarryName", "colours", "location"]
                        }
                    },
                    grid: {
                        options: gridOptions
                    },
                    buttons: {
                        add: {
                            text: "New",
                            toolTip: "New Quarry",
                            claim: "Quarry:QuarryAdd",
                            save: self.addQuarry
                        },
                        edit: {
                            claim: "Quarry:QuarryEdit"
                        },
                        delete: {
                            claim: "Quarry:QuarryDelete"
                        }
                    }
                }
            };
        }

        public addQuarry(ev: ng.IAngularEvent, context: Quarry): void {
            const self: Quarry = context;

            let model: Models.IQuarryModel = <Models.IQuarryModel>{ quarryId: 0, colourIds: [] };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model: Models.IQuarryModel, dialogMode: Shared.Dialog.Models.DialogMode,
                                ev: ng.IAngularEvent, context: Quarry): void {
            const self: Quarry = context;

            self.dialogService.show({
                templateUrl: "quarry_dialog",
                targetEvent: ev,
                data: { model: model, service: self.quarryService },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.IQuarryModel): void {
                    if (dialogMode === Shared.Dialog.Models.DialogMode.delete) {
                        self.quarryService.deleteQuarry(dialogModel.quarryId).then(function (): void {
                            self.quarryService.getQuarries();
                            self.dialogService.hide();
                        });
                    } else {
                        self.quarryService.saveQuarry(dialogModel).then(function (): void {
                            // update the grid values
                            if (dialogModel.quarryId === 0) {
                                self.quarryService.getQuarries();
                            } else {
                                model.quarryName = dialogModel.quarryName;
                                model.location = dialogModel.location;
                                angular.extend(model.colourIds, dialogModel.colourIds);
                                model.colours = self.utility.getListItem(self.quarryService.colourListItems, dialogModel.colourIds[0]);
                            }

                            self.dialogService.hide();
                        });
                    }
                });
        }
    }
}
