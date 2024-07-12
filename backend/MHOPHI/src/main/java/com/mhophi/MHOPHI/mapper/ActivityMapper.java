//package com.mhophi.MHOPHI.mapper;
//
//import com.mhophi.MHOPHI.entities.Activity;
//import com.mhophi.MHOPHI.entities.Department;
//import com.mhophi.MHOPHI.payload.ActivityDto;
//import com.mhophi.MHOPHI.payload.DepartmentDto;
//
//public class ActivityMapper {
//
//    public static Activity mapToActivity(ActivityDto activityDto, Department department) {
//        Activity activity = new Activity();
//        activity.setActivityId(activityDto.getActivityId());
//        activity.setCreatedAt(activityDto.getCreatedAt());
//        activity.setActivityName(activityDto.getActivityName());
//        activity.setDescription(activityDto.getDescription());
//        activity.setDepartment(department);
//        return activity;
//    }
//    
//
////    public static ActivityDto mapToActivityDto(Activity activity) {
////        DepartmentDto departmentDto = DepartmentMapper.mapToDepartmentDto(activity.getDepartment());
////        ActivityDto activityDto = new ActivityDto();
////        activityDto.setActivityId(activity.getActivityId());
////        activityDto.setCreatedAt(activity.getCreatedAt());
////        activityDto.setActivityName(activity.getActivityName());
////        activityDto.setDescription(activity.getDescription());
////        activityDto.setDepartment(departmentDto);
////        return activityDto;
////    }
//
//    public static ActivityDto mapToActivityDto(Activity activity) {
//    	DepartmentDto mapToDepartmentDto = DepartmentMapper.mapToDepartmentDto(activity.getDepartment());
//        ActivityDto activityDto = new ActivityDto();
//        activityDto.setActivityId(activity.getActivityId());
//        activityDto.setCreatedAt(activity.getCreatedAt());
//        activityDto.setActivityName(activity.getActivityName());
//        activityDto.setDescription(activity.getDescription());
//        activityDto.setDepartment(mapToDepartmentDto);
//        return activityDto;
//    }
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
////import com.mhophi.MHOPHI.entities.Activity;
////import com.mhophi.MHOPHI.entities.Department;
////import com.mhophi.MHOPHI.payload.ActivityDto;
////import com.mhophi.MHOPHI.payload.DepartmentDto;
////
////public class ActivityMapper {
////
////    public static Activity mapToActivity(ActivityDto activityDto, Department department) {
////        Activity activity = new Activity();
////        activity.setActivityId(activityDto.getActivityId());
////        activity.setCreatedAt(activityDto.getCreatedAt());
////        activity.setActivityName(activityDto.getActivityName());
////        activity.setDescription(activityDto.getDescription());
////        activity.setDepartment(DepartmentMapper.mapToDepartment(activityDto.getDepartment()));
////        return activity;
////    }
////
////    public static ActivityDto mapToActivityDto(Activity activity) {
////        ActivityDto dto = new ActivityDto();
////        dto.setActivityId(activity.getActivityId());
////        dto.setCreatedAt(activity.getCreatedAt());
////        dto.setActivityName(activity.getActivityName());
////        dto.setDescription(activity.getDescription());
////        dto.setDepartment(DepartmentMapper.mapToDepartmentDto(activity.getDepartment()));
////        return dto;
////    }
////}
