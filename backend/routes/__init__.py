from .cure_routes import router as cure_router
from .liner_routes import router as liner_router
from .liner_application_routes import router as liner_application_router
from .material_routes import router as material_router
from .tdms_uploader_routes import router as tdms_uploader_router
# from .single_run_routes import router as single_run_router
# from .tensile_dashboard_routes import router as tensile_dashboard_router

# Aggregate all routers into a list for easy inclusion in main.py
routers = [
    cure_router,
    liner_router,
    liner_application_router,
    material_router,
    tdms_uploader_router,

]