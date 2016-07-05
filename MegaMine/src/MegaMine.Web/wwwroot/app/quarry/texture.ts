﻿module MegaMine.Quarry {

    "use strict";
    @controller("megamine", "MegaMine.Quarry.Texture")
    @inject("quarryService", "utility", "constants", "dialogService", "template")
    export class Texture {

        private grid;

        constructor(private quarryService, private utility, private constants, private dialogService, private template) {
            let self = this;

            self.grid = {
                options: <uiGrid.IGridOptions>{
                    columnDefs: [
                        { name: "textureName", field: "textureName", displayName: "Name", type: "string" }
                    ]
                },
                data: <TextureModel[]>quarryService.textures
            };

            self.grid.view = self.viewDialog;
            self.grid.context = self;
            self.grid.options.columnDefs.push(template.getButtonDefaultColumnDefs("textureId", "Quarry:TextureEdit", "Quarry:TextureDelete", false));
        }

        private addTexture(ev: angular.IAngularEvent, context: Texture): void {
            let self = context;

            let model: TextureModel = <TextureModel>{ textureId: 0 }
            self.viewDialog(model, self.constants.enum.dialogMode.save, ev, context);
        }

        public viewDialog(model: TextureModel, dialogMode, ev: angular.IAngularEvent, context: Texture): void {
            let self: Texture = context;

            self.dialogService.show({
                templateUrl: "texture_dialog",
                targetEvent: ev,
                data: { model: model, service: self.quarryService },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: TextureModel) {
                    if (dialogMode === self.constants.enum.buttonType.delete) {
                        self.quarryService.deleteTexture(dialogModel.textureId).then(function () {
                            self.quarryService.getTextures();
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.quarryService.saveTexture(dialogModel).then(function () {
                            //update the grid values
                            if (dialogModel.textureId === 0) {
                                self.quarryService.getTextures();
                            }
                            else {
                                model.textureName = dialogModel.textureName
                            }

                            self.dialogService.hide();
                        });
                    }
                });
        }
    }
}