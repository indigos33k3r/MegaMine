﻿module MegaMine.Fleet {

    @config("megamine")
    @inject("$stateProvider", "$windowProvider")
    class Route {

        constructor($stateProvider: ng.ui.IStateProvider, $windowProvider: ng.IServiceProvider) {
            let virtualPath: string = $windowProvider.$get().virtualDirectory;


            $stateProvider
                .state("vehiclelist", {
                    url: virtualPath + "/vehiclelist",
                    title: "Vehicle List",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/vehiclelist.html",
                    controller: "vehicleList",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['vehicleService', function (vehicleService) {
                            return vehicleService.getVehicleList();
                        }]
                    }
                })

                .state("vehicle", {
                    url: virtualPath + "/vehicle/:vehicleid",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: "/app/fleet/vehicle.html",
                    controller: "vehicle",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                            return vehicleService.getVehicle($stateParams.vehicleid);
                        }]
                    }
                })

                .state("vehicle.service", {
                    url: "/service",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: virtualPath + "/app/fleet/vehicleServiceRecord.html",
                    controller: "vehicleServiceRecord",
                    controllerAs: "vm",
                })

                .state("vehicle.fuel", {
                    url: "/fuel",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: virtualPath + "/app/fleet/vehicleFuel.html",
                    controller: "vehicleFuel",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                            return vehicleService.getFuelList($stateParams.vehicleid);
                        }]
                    }
                })

                .state("vehicle.driver", {
                    url: "/driver",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: virtualPath + "/app/fleet/vehicleDriver.html",
                    controller: "vehicleDriver",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                            return vehicleService.getVehicleDriverList($stateParams.vehicleid);
                        }]
                    }
                })

                .state("vehicle.vehicletrip", {
                    url: "/vehicletrip",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: virtualPath + "/app/fleet/vehicleTrip.html",
                    controller: "vehicleTrip",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                            return vehicleService.getTripList($stateParams.vehicleid);
                        }]
                    }
                })

                .state("vehicletype", {
                    url: virtualPath + "/vehicletype",
                    title: "Vehicle Types",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/vehicletype.html",
                    controller: VehicleType,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Fleet.FleetService", function (fleetService: FleetService):
                            ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IVehicleTypeModel[]>> {
                            return fleetService.getVehicleTypes();
                        }]
                    }
                })

                .state("servicereport", {
                    url: virtualPath + "/servicereport",
                    title: "Service Report",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/servicereport.html",
                    controller: "servicereport",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['vehicleService', function (vehicleService) {
                            return vehicleService.getVehicleList();
                        }]
                    }
                })

                .state("driver", {
                    url: virtualPath + "/driver",
                    title: "Drivers",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/driver.html",
                    controller: Driver,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Fleet.FleetService", function (fleetService: FleetService):
                            ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IVehicleDriverModel[]>> {
                            return fleetService.getDrivers();
                        }]
                   }
                })

                .state("manufacturerlist", {
                    url: virtualPath + "/manufacturerlist",
                    title: "Manufacturers",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/manufacturerlist.html",
                    controller: ManufacturerList,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Fleet.FleetService", function (fleetService: FleetService):
                            ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IVehicleManufacturerModel[]>> {
                            return fleetService.getManufacturerList();
                        }]
                    }
                })

                .state("manufacturer", {
                    url: virtualPath + "/manufacturer/:manufacturerid",
                    title: "Manufacturer",
                    previousState: "manufacturerList",
                    templateUrl: "/app/fleet/manufacturer.html",
                    controller: "manufacturer",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["$stateParams", "vehicleService", function ($stateParams, vehicleService) {
                            return vehicleService.getManufacturer($stateParams.manufacturerid);
                        }]
                    }
                });
        }
    }
}