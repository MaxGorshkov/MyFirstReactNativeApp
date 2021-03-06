export enum appUrls {
    api_get_resources = '/api/resources',
    api_get_resources_version = '/api/resources/version',

    api_login = '/api/login',
    api_logout = '/api/logout',
    api_connect = '/api/connect',
    api_disconnect = '/api/disconnect',

    api_get_client = '/api/client',
    api_create_client = '/api/client',
    api_update_client = '/api/client',
    api_client_check = '/api/client/check',
    api_service_get_client = '/api/service/client/:clientId',
    api_service_update_client = '/api/service/client',
    api_service_get_clients = '/api/service/clients',
    api_service_get_clients_count = '/api/service/clients/count',

    api_get_project = '/api/project/:projectId',
    api_get_project_manager = '/api/project/:projectId/manager',
    api_service_project_check = '/api/service/project/check/:name',
    api_service_create_project = '/api/service/project',
    api_service_update_project = '/api/service/project',
    api_service_delete_project = '/api/service/project/:projectId',
    api_service_get_projects = '/api/service/projects',
    api_service_get_projects_count = '/api/service/projects/count',
    api_service_get_projects_summary_report = '/api/service/projects/summaryReport',
    api_service_get_project_weekly_report = '/api/service/project/:projectId/weeklyReport',
    api_service_get_projects_weekly_report = '/api/service/projects/weeklyReport',

    api_get_project_report_data = '/api/project/:projectId/report/:reportId/data',
    api_get_project_report = '/api/project/:projectId/report/:reportId',
    api_service_create_project_report = '/api/service/project/:projectId/report',
    api_update_project_report = '/api/project/:projectId/report',
    api_service_delete_project_report = '/api/service/project/:projectId/report/:reportId',
    api_service_get_project_reports = '/api/service/project/:projectId/reports',
    api_service_get_project_reports_count = '/api/service/project/:projectId/reports/count',

    api_add_client_side_error = '/api/error',
    api_service_security_requests = '/api/service/security/requests',
    api_service_security_requests_count = '/api/service/security/requests/count',
    api_service_security_dictionaries = '/api/service/security/dictionaries',
    api_service_get_client_side_errors = '/api/service/security/errors',
    api_service_get_client_side_errors_count = '/api/service/security/errors/count',

    api_get_project_analytics_dictionaries = '/api/project/:projectId/dictionaries',
    api_update_project_analytics_campaigns = '/api/project/:projectId/campaigns',
    api_update_project_analytics_criterias = '/api/project/:projectId/criterias',
    api_get_project_analytics_commerceDetailsForPeriod = '/api/project/:projectId/commerceDetails/period',
    api_get_project_analytics_commerceSummaryForPeriod = '/api/project/:projectId/commerceSummary/period',
}
