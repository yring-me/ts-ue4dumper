cmake_minimum_required(VERSION 3.28)

set(CMAKE_CXX_STANDARD 17)

set(CMAKE_ANDROID_NDK "YOUR_ANDROID_NDK_PATH")

set(CMAKE_SYSTEM_NAME Android)

set(CMAKE_ANDROID_ARCH_ABI arm64-v8a)

set_target_properties(${PROJECT_NAME} PROPERTIES
        CMAKE_CXX_VISIBILITY_PRESET default
        CMAKE_C_VISIBILITY_PRESET default
        VISIBILITY_INLINES_HIDDEN OFF
)

set(CMAKE_BUILD_TYPE DEBUG)
set(CMAKE_C_FLAGS_RELEASE "${CMAKE_C_FLAGS_RELEASE} -g")
set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -g")

SET(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} $ENV{MY_C_FLAGS}")

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O0")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O0")


SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} $ENV{MY_CXX_FLAGS} -std=c++11")

# set output DIRECTORY
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY  ${CMAKE_SOURCE_DIR}/output)

project(UE4Offset)

add_library(${PROJECT_NAME} SHARED
        # main.cpp
        UObject/UObject.cpp
        FName/FName.cpp
        FNameEntry/FNameEntry.cpp
        FNamePool/FNamePool.cpp
        UStruct/UStruct.cpp
        UField/UField.cpp
        FField/FField.cpp
        FProperty/FProperty.cpp
        UWorld/UWorld.cpp
        ULevel/ULevel.cpp
        UGameInstance/UGameInstance.cpp
        ULocalPlayer/ULocalPlayer.cpp
        FUObjectArray/FUObjectArray.cpp
        TUObjectArray/TUObjectArray.cpp
        FUObjectItem/FUObjectItem.cpp
        UEnum/UEnum.cpp
        UFunction/UFunction.cpp

)

add_custom_command(TARGET ${PROJECT_NAME} COMMAND adb push ${CMAKE_SOURCE_DIR}/output/lib${PROJECT_NAME}.so /data/local/tmp/)
add_custom_command(TARGET ${PROJECT_NAME} COMMAND adb shell chmod 777 /data/local/tmp/lib${PROJECT_NAME}.so)